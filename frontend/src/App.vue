<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2" :width="400">
      <DocumentList @selected="onDocSelected"/>
    </q-drawer>
    <q-page-container>
      <DocumentDetail :doc="selectedDoc"/>
    </q-page-container>
  </q-layout>
</template>

<script>
  import DocumentList from './components/DocumentList.vue'
  import DocumentDetail from "./components/DocumentDetail";

  export default {
    name: 'LayoutDefault',
    components: {
      DocumentDetail,
      DocumentList,
    },
    data() {
      return {
        leftDrawerOpen: true,
        selectedDoc: {}
      }
    },
    methods: {
      onDocSelected(doc) {
        if (doc) {
          this.selectedDoc = doc;
        }
      }
    }
  }
</script>

<style>
</style>
