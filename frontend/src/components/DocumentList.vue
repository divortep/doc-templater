<template>
  <q-list>
    <q-item>
      <q-item-section></q-item-section>
      <q-item-section>
        <q-btn outline rounded label="Upload" @click="showUploadDialog = true"/>
        <FileUploader :show.sync="showUploadDialog" @uploaded="get_documents()"/>
      </q-item-section>
    </q-item>
    <q-item v-for="doc in documents"
            :key="doc.id"
            clickable
            @click="selectDoc(doc)"
            :active="doc.id === selectedDoc.id"
            active-class="q-btn--rectangle active-doc"
    >
      <q-item-section avatar>
        <q-icon name="fas fa-file-word"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{doc.file_name}}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon name="fas fa-trash-alt" size="14px" @click="del_document(doc.id)"/>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  import FileUploader from './FileUploader'
  import DocumentRepository from "../repositories/document.repository";

  export default {
    name: "DocumentsList",
    components: {
      FileUploader
    },
    data() {
      return {
        documents: Array,
        showUploadDialog: false,
        isLoading: Boolean,
        selectedDoc: {}
      }
    },
    async created() {
      await this.get_documents();
    },
    methods: {
      async get_documents() {
        this.isLoading = true;
        const {data} = await DocumentRepository.getAll();
        this.isLoading = false;

        this.documents = data.sort((doc1, doc2) => doc1.file_name.localeCompare(doc2.file_name));
        this.documents.forEach(doc => doc.context = doc.context ? JSON.parse(doc.context) : []);
        if (this.documents.length > 0) {
          this.selectDoc(this.documents[0]);
        } else {
          this.selectDoc({});
        }
      },

      async del_document(id) {
        this.isLoading = true;
        await DocumentRepository.delete(id);
        this.get_documents()
      },

      selectDoc(doc) {
        if (doc) {
          this.selectedDoc = doc;
          this.$emit('selected', this.selectedDoc);
        }
      }
    }
  }
</script>

<style scoped>
  .active-doc {
    font-weight: bold;
  }
</style>