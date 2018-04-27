module.exports = {
  apps: [
    {
      name: 'NuxtBlog-V1',
      script: 'build/main.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '198.13.32.165',
      ref: 'origin/master',
      repo: 'git@github.com:LDQ-first/NuxtBlog-V1.git',
      path: '/www/NuxtBlog-V1',
      'post-deploy': 'yarn && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
