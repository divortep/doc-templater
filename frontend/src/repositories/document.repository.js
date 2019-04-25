import Repository, {apiPath} from "./base.repository";

const resource = '/document';
export const UPLOAD_URL = `${apiPath}${resource}/upload`;

export default {
  getAll() {
    return Repository.get(`${resource}s`);
  },

  delete(id) {
    return Repository.delete(`${resource}/${id}`);
  },

  updateContext(docId, context) {
    const contextStr = JSON.stringify(context);
    return Repository.post(`${resource}/${docId}`, contextStr);
  },

  download(doc) {
    Repository.get(`${resource}/${doc.id}/download`, {responseType: 'blob'})
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', doc.file_name);
          document.body.appendChild(link);
          link.click();
        });
  }
}

