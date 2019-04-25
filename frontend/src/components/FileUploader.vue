<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Upload document</div>
      </q-card-section>

      <q-card-section>
        <q-uploader
            flat
            bordered
            multiple
            batch
            auto-upload
            accept=".docx"
            :url="UPLOAD_URL"
            @uploaded="onUploaded()"
            class="uploader"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="hideDialog()"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
  import {UPLOAD_URL} from "../repositories/document.repository";

  export default {
    name: "FileUploader",
    props: {
      'show': Boolean
    },
    data() {
      return {
        UPLOAD_URL: UPLOAD_URL
      }
    },
    methods: {
      hideDialog() {
        this.$emit('update:show', false);
      },
      onUploaded() {
        this.$emit('uploaded', false);
      }
    }
  }
</script>

<style scoped>
  .uploader {
    width: 500px;
    height: 200px;
  }
</style>