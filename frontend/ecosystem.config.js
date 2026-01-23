module.exports = {
  apps: [
    {
      name: 'frontend',
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF,
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      'post-deploy': 'bash frontend/post-build.sh'
    },
  },
};
