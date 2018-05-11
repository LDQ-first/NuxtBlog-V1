<template>
  <div class="tags">
    <template v-if="$route.params.id">
      <top-lists :articles="lists"/>
    </template>
    <template v-else>
      <input type="text" class="search" placeholder="标签搜索"
      :value="searchString" @input="changeSearchString">
      <ul class="tags-list">
        <li class="tag" v-for="(tag, index) in lists" :key="index">
          <nuxt-link :to="'/tags/'+ tag.id">{{ tag.name }}</nuxt-link>
        </li>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
  async asyncData({ store, route }) {
    let id = route.params.id || ''
    const { data } = await store.dispatch('TAGS', id)
    return {
      AllLists: data || []
    }
  },
  head() {
    return {
      title: '标签 - ' + this.$store.state.user.nickname
    }
  },
  data() {
    return {
      searchString: ''
    }
  },
  computed: {
    lists() {
      if (!this.searchString) {
        return this.AllLists
      } else {
        return this.AllLists.filter(({ name }) =>
         name.toLowerCase().indexOf(this.searchString) > -1)
      }
    }
  },
  methods: {
    changeSearchString(e) {
      console.log(e.target.value)
      this.searchString = e.target.value.trim().toLowerCase()
    }
  }
}

</script>
<style lang="scss" scoped>
@import '~/assets/css/var.scss';

.tags {
  padding: 40px 0;
  position: relative;
}

.search {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  width: 280px;
}

.tags-list {
  max-width: 700px;
  margin: 100px auto;
  li {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    a {
      color: $tag-color;
      padding: 3px 10px;
      background-color: $tag-bg;
      border-radius: 3px;
      &:hover {
        background-color: darken(#eee, 5%);
      }
    }
  }
}
</style>
