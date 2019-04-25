import json
import re
import tempfile

import docx2txt
from django.db import models
from docxtpl import DocxTemplate
from rest_framework import serializers


class DocumentManager(models.Manager):
    def create_document(self, description, file_name, file_data):
        doc = self.create(description=description,
                          file_name=file_name,
                          file_data=file_data)

        doc.set_context()
        return doc

    def download(self, id):
        doc = self.get(id=id)
        file_data = doc.file_data.tobytes()
        with tempfile.NamedTemporaryFile() as template_file, tempfile.NamedTemporaryFile() as doc_file:
            template_file.write(file_data)
            template_file.seek(0)

            template = DocxTemplate(template_file.name)
            context = doc.get_context()
            template.render(context)
            template.save(doc_file.name)
            binary_data = doc_file.read()
            return binary_data, doc.file_name


class Document(models.Model):
    description = models.CharField(max_length=255)
    context = models.TextField()
    file_name = models.CharField(max_length=255)
    file_data = models.BinaryField()
    objects = DocumentManager()

    def __str__(self):
        return "%s, %s, %s" % (self.id, self.description, self.file_name)

    def set_context(self):
        with tempfile.NamedTemporaryFile() as tmp_file:
            tmp_file.write(self.file_data)
            tmp_file.seek(0)

            placeholder_regex = re.compile(r'{{(.*?)}}')
            doc_text = docx2txt.process(tmp_file.name)
            placeholders = placeholder_regex.findall(doc_text)
            placeholders = set(map(lambda ph: ph.lower(), placeholders))
            print(placeholders)
            context = list(({'placeholder': placeholder, 'value': ''}) for placeholder in placeholders)
            self.context = json.dumps(context)

    def get_context(self):
        context_list = json.loads(self.context)
        upper_context_list = list(
            ({'placeholder': ctx_obj['placeholder'].upper(), 'value': ctx_obj['value']}) for ctx_obj in context_list)
        context_list = context_list + upper_context_list
        return {(ctx_obj.get('placeholder'), ctx_obj['value']) for ctx_obj in context_list}


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ('id', 'description', 'context', 'file_name')
