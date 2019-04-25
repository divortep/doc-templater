import Vue from 'vue'
import App from './App.vue'

import './styles/quasar.styl'
import 'quasar/dist/quasar.ie.polyfills'
import iconSet from 'quasar/icon-set/fontawesome-v5.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import {
  ClosePopup,
  QBtn,
  QBtnDropdown,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QDrawer,
  QHeader,
  QIcon,
  QInput,
  QItem,
  QItemLabel,
  QItemSection,
  QLayout,
  QList,
  QPage,
  QPageContainer,
  QPopupEdit,
  QTable,
  QTd,
  QTh,
  QToolbar,
  QToolbarTitle,
  QTr,
  Quasar,
  QUploader
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QBtn,
    QBtnDropdown,
    QCard,
    QCardActions,
    QCardSection,
    QDialog,
    QDrawer,
    QHeader,
    QIcon,
    QInput,
    QItem,
    QItemLabel,
    QItemSection,
    QLayout,
    QList,
    QPage,
    QPageContainer,
    QPopupEdit,
    QTd,
    QTh,
    QTable,
    QToolbar,
    QToolbarTitle,
    QTr,
    QUploader,

  },
  directives: {
    ClosePopup
  },
  plugins: {},
  iconSet: iconSet
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
