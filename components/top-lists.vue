<template>
  <div class="list">
    <ul class="list-article">
      <li class="article" v-for="(article, index) in articles" :key="`${article.id}-${index}`">
        <nuxt-link class="title-link" :to="'/detail/' + article.id">
          <div class="bg" :style="randomBg()"></div>
          <div class="main">
            <h2 class="article-title">
              {{ article.title }}
            </h2>
            <div class="detail-meta">
              <span>
                创建于 {{ article.createdAt | formatDate('yyyy-MM-dd') }}
                <span class="meta-division">/</span> 更新于 {{ article.updatedAt | formatDate('yyyy-MM-dd') }}
              <span class="meta-division">/</span> {{ article.views }}次浏览
              </span>
            </div>
            <p class="article-body">{{ article.content | cutString(170) }}</p>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'top-lists',
  props: {
    articles: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    randomBg() {
      let num = parseInt(Math.random() * 6)
      return `background: url(../static/lists/${num || 1}.jpg) center/cover no-repeat`
    }
  }
}

</script>
<style lang="scss">
$link-color: #42B983;
$font-color: #24292e;
.list {
  ul {
    list-style: none;
  }
  .article {
    max-width: 700px;
    margin: 60px auto;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px,
                rgba(0, 0, 0, 0.12) 0px 1px 4px;
    border-radius: 6px;
    overflow: hidden;
    background: #fafafa;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px,
                  rgba(0, 0, 0, 0.23) 0px 6px 10px;
    }
    .title-link {
      width: 100%;
    }
    .bg {
      width: 100%;
      height: 200px;
    }
    .main {
      padding: 20px;
      .detail-meta {
        font-size: 14px;
        color: #999;
        margin-bottom: 30px;
        .meta-division {
          margin: 0 7px;
        }
      }
    }
    .article-title {
      font-size: 20px;
      font-weight: normal;
      margin-bottom: 15px;
      a {
        color: $font-color;
        &:hover {
          color: $link-color;
        }
      }
    }
    .article-body {
      margin: 10px 0;
      color: #666;
    }
  }
}

</style>
