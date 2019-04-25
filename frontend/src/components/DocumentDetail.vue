<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="q-pa-md placeholders-table-container">
    <q-table
        hide-bottom flat
        :title="doc.file_name"
        :data="doc.context"
        :columns="columns"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        :bordered="false"
        row-key="placeholder"
        table-class="placeholders-table"
    >
      <template v-slot:top-right>
        <q-btn rounded unelevated size="sm" color="primary" label="Save as.." @click="saveDoc()"/>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="placeholder" :props="props">{{ props.row.placeholder }}</q-td>
          <q-td key="value" :props="props">
            {{ props.row.value }}
            <q-popup-edit v-model="props.row.value" @save="saveValues()">
              <q-input v-model="props.row.value" hint="Press Enter to save" dense autofocus counter/>
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
  import DocumentRepository from "../repositories/document.repository";

  export default {
    name: "DocumentDetail",
    props: {
      'doc': {}
    },
    data() {
      return {
        columns: [
          {
            name: 'placeholder',
            align: 'left',
            label: 'Placeholder',
            field: 'placeholder',
            sortable: true,
            style: 'width: 200px'
          },
          {name: 'value', align: 'left', label: 'Value', field: 'value'}
        ],
        pagination: {
          sortBy: 'placeholder',
          descending: false,
          page: 1,
          rowsPerPage: 0 // 0 means all rows
        }
      }
    },
    methods: {
      async saveValues() {
        this.doc.context.forEach(placeholder => delete placeholder['__index']);
        await DocumentRepository.updateContext(this.doc.id, this.doc.context);
      },

      async saveDoc() {
        await DocumentRepository.download(this.doc);
      }
    }
  }
</script>

<style>
  .placeholders-table-container {
    margin-top: 35px;
  }

  .placeholders-table th {
    font-size: 14px !important;
  }
</style>