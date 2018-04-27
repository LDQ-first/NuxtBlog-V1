import Vue from 'vue'
import TopTip from '../components/top-tip.vue'
import TopLists from '../components/top-lists.vue'
import TopComments from '../components/top-comments.vue'
import TopPreview from 'vue-blogeditor/src/lib/TopPreview.vue'
import vueBlogEditor from 'vue-blogeditor/src/lib/TopEditor.vue'

const components = { TopTip, TopLists, TopComments, TopPreview, vueBlogEditor }

Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})
