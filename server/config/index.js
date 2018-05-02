export default {
  user: {
    role: 'superAdmin',
    username: 'q',
    password: 'q',
    email: '178848890@qq.com',
    nickname: 'NuxtBlog-V1',
    motto: 'Never too old to learn',
    avatar: 'avatar.png'
  },
  jwt: {
    secret: 'NuxtBlog-V1'
  },
  mongodb: {
    host: '127.0.0.1',
    database: 'NuxtBlog-V1',
    port: 27017,
    username: '',
    password: ''
  },
  production: {
    host: '',
    // host: '198.13.32.165',
    // domain: ''
    domain: 'http://127.0.0.1:3001'
  },
  app: {
    host: '127.0.0.1',
    port: 3001,
    routerBaseApi: 'api'
  }
}
