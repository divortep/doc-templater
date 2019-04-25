from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser

from doc_templater.models import DocumentSerializer, Document


@csrf_exempt
@parser_classes((FormParser, MultiPartParser))
def upload_document(request):
    for filename, file in request.FILES.items():
        Document.objects \
            .create_document(description=filename, file_name=filename, file_data=file.read()) \
            .save()
    return HttpResponse(status=status.HTTP_201_CREATED)


@csrf_exempt
def download_document(request, id):
    doc, file_name = Document.objects.download(id=id)
    response = HttpResponse(doc,
                            content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    response['Content-Disposition'] = 'attachment; filename=' + file_name
    return response


@csrf_exempt
def all_documents(request):
    documents = Document.objects.all()
    serializer = DocumentSerializer(documents, many=True)
    return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def document(request, id):
    doc = Document.objects.get(id=id)
    if not doc:
        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DocumentSerializer(doc)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        doc.context = request.body.decode('utf-8')
        doc.save()
        serializer = DocumentSerializer(doc)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'DELETE':
        doc.delete()
        return HttpResponse()
