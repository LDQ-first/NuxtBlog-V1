<template>
  <div class="blog" :class="{ noScroll: isShowCover }">
    <aside class="blog-cover" ref="blogCover" v-show="isShowCover">
      <div class="blog-profile">
        <div class="blog-avatar"  @click="showMain">
          <img src="../static/avatar.jpg" class="avatar" alt="">
        </div>
        <h1 class="profile-title">NuxtBlog-V1</h1>
        <p class="profile-des">记录美好生活</p>
        <ul class="profile-links clearfix">
          <li v-for="(link, index) in links" :key="index" class="profile-link">
            <a :href="link.link" target="_blank"><img :src="link.icon" alt="" class="profile-link-img"></a>
          </li>
        </ul>
        <span class="show-main"  @click="showMain">
          <i class="iconfont icon-backtop"></i>
        </span>
      </div>
    </aside>
    <div class="blog-main">
      <div class="header-wraper" ref="blogHeaderWraper">
        <header class="blog-header" ref="blogHeader">
          <h1 class="header-title"><a href="/">{{ $store.state.user.nickname }}</a></h1>
          <nav class="header-nav">
            <!-- admin navs -->
            <ul class="nav-list" v-if="/^(admin)/.test($route.name)">
              <li v-for="(nav, index) in adminNavs" :key="index" :class="{'nav-active': nav.routerName === $route.name}">
                <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
              </li>
              <li><a @click="logout">退出</a></li>
            </ul>
            <!-- front navs -->
            <ul class="nav-list" v-else>
              <li v-for="(nav, index) in navs" :key="index" :class="{'nav-active': nav.routerName === $route.name}">
                <nuxt-link :to="nav.path">{{ nav.name }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </header>
        <div class="header-profile">
            <h1 class="header-title" ref="blogHeaderTitle">NuxtBlog-V1</h1>
            <p class="header-des">记录美好生活</p>
            <ul class="header-links clearfix">
              <li v-for="(link, index) in links" :key="index" class="header-link">
                <a :href="link.link" target="_blank"><img :src="link.icon" alt="" class="header-link-img"></a>
              </li>
            </ul>
          </div>
      </div>
      <section class="blog-body">
        <nuxt/>
      </section>
      <aside class="blog-aside">
        <a href="#" class="aside-backtop"><i class="iconfont icon-backtop"></i></a>
        <a href="/admin/publish" class="aside-new"><i class="iconfont icon-logs"></i></a>
      </aside>
      <footer class="blog-footer">
        <p>Powered by <a href="https://github.com/LDQ-first/NuxtBlog-V1" target="_blank">NuxtBlog-V1</a>.</p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [{
        icon: '../static/github.svg',
        link: 'https://github.com/LDQ-first/NuxtBlog-V1'
      }, {
        icon: '../static/vue.svg',
        link: 'https://cn.vuejs.org/'
      }, {
        icon: '../static/nuxt.png',
        link: 'https://nuxtjs.org/'
      }, {
        icon: '../static/rss.svg',
        link: `/rss.xml`
      }],
      isShowCover: this.$route.path === '/',
      keyword: '',
      navs: [{
        path: '/',
        routerName: 'index',
        name: '首页'
      },
      {
        path: '/tags',
        routerName: 'tags-id',
        name: '标签'
      },
      {
        path: '/archives',
        routerName: 'archives',
        name: '归档'
      },
      {
        path: '/search',
        routerName: 'search-id',
        name: '搜索'
      }
      ],

      adminNavs: [{
        path: '/',
        routerName: 'index',
        name: '首页'
      }, {
        path: '/admin/private',
        routerName: 'admin-private',
        name: '草稿'
      },
      {
        path: '/admin/tags',
        routerName: 'admin-tags',
        name: '标签'
      },
      {
        path: '/admin/update',
        routerName: 'admin-update',
        name: '修改'
      }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', (e) => {
      if (this.$refs.blogHeaderTitle && window.scrollY > this.$refs.blogHeaderTitle.offsetTop) {
        this.$refs.blogHeader.classList.add('bg')
      } else {
        this.$refs.blogHeader.classList.remove('bg')
      }
    })
  },
  methods: {
    search() {
      if (this.keyword === '') {
        return '需要输入内容'
      } else {
        let keyword = encodeURIComponent(this.keyword)
        this.$router.push(`/search/${keyword}`)
      }
    },
    logout() {
      this.$store.dispatch('LOGOUT').then(data => {
        if (data.success) {
          this.$store.state.token = ''
          this.$router.push('/')
        }
      })
    },
    showMain() {
      this.$refs.blogCover.classList.add('hidden')
      const timer = setTimeout(() => {
        this.isShowCover = false
        clearTimeout(timer)
      }, 1000)
    }
  }
}

</script>
<style lang="scss">
@import '~/assets/css/var.scss';

@keyframes hide {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh);
  }
}


@keyframes shakeIcon {
    0% {
        transform: scaleX(1)
    }

    30% {
        transform: scale3d(1.25,.75,1)
    }

    40% {
        transform: scale3d(.75,1.25,1)
    }

    50% {
        transform: scale3d(1.15,.85,1)
    }

    65% {
        transform: scale3d(.95,1.05,1)
    }

    75% {
        transform: scale3d(1.05,.95,1)
    }

    to {
        transform: scaleX(1)
    }
}

.blog {
  position: relative;
  min-width: 320px;
  &.noScroll {
    height: 100vh;
    overflow: hidden;
  }
  .blog-cover {
    background: #2C61A5 url('../static/bg.jpg') center/cover no-repeat;
    height: 100vh;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    &.hidden {
      animation: hide 1s ease-in-out forwards;
    }
    .blog-profile {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .blog-avatar {
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 3px 6px rgba(0,0,0,.16),
                    0 3px 6px rgba(0,0,0,.23);
        overflow: hidden;
        margin-bottom: 20px;
        &:hover {
          animation: shakeIcon 1s ease-in;
        }
        .avatar {
          width: 128px;
          height: 128px;
        }
      }
      .profile-title {
        margin-bottom: 20px;
      }
      .profile-des {
         margin-bottom: 20px;
      }
      .profile-links {
        .profile-link {
          float: left;
          margin: 0 15px;
          .profile-link-img {
            width: 50px;
            height: 50px;
          }
        }
      }
      .show-main {
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        background: #FFF;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        cursor: pointer;
      }
    }
  }
  .blog-main {
    min-height: 100vh;
    background: linear-gradient(to left, rgba(97, 144, 232, 0.3), rgba(167, 191, 232, 0.2));
  }
  .header-wraper {
    width: 100%;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('../static/header.jpg') center/cover no-repeat;
    height: 400px;
    position: relative;
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(167, 191, 232, .2);
      z-index: 0;
    }
    .header-profile {
      position: relative;
      z-index: 10;
      color: #FFF;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .header-title {
        margin-bottom: 10px;
      }
      .header-des {
         margin-bottom: 20px;
      }
      .header-links {
        .header-link {
          float: left;
          margin: 0 20px;
          .header-link-img {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }
  .blog-header {
    position: fixed;
    z-index: 90;
    width: 100%;
    min-width: 320px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    line-height: 50px;
    &.bg {
      background: rgb(0, 144, 234);
    }
    @media (max-width:420px) {
      padding: 0 12px;
    }
    @media (max-width:370px) {
      padding: 0 8px;
    }
    .header-title {
      font-size: 18px;
      font-weight: 600;
      a:link,
      a:visited,
      a:hover,
      a:active {
        color: $header-color;
      }
    }
    .header-nav {
      ul {
        list-style: none;
      }
      li {
        display: inline-block;
        a {
          color: $header-color;
          padding: 0 15px;
          @media (max-width:500px) {
            padding: 0 10px;
          }
          @media (max-width:420px) {
            padding: 0 6px;
          }
          @media (max-width:340px) {
            padding: 0 2px;
          }
          &:hover {
            color: $link-color;
          }
        }
        &.nav-active a {
          color: $link-color;
          font-weight: bold;
        }
      }
    }
  }
  .blog-body {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 150px;
    min-height: 50vh;
  }
  .blog-aside {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 999;
    @media (max-width: 900px) {
      right: 20px;
    }
    .aside-new,
    .aside-backtop {
      display: block;
      width: 40px;
      line-height: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #fafafa;
      border: 1px solid #fff;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
      text-align: center;
      opacity: 1;
    }
    .aside-backtop{
      margin-bottom: 10px;
      i {
        font-size: 25px;
      }
    }
  }
  .blog-footer {
    max-width: 700px;
    margin: 0 auto;
    border-top: 1px solid #eee;
    text-align: center;
    font-size: 12px;
    p {
      line-height: 50px;
      color: #999;
    }
    a {
      color: $link-color;
    }
  }
}

</style>
