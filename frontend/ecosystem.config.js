module.exports = {
  apps: [
    {
      name: 'frontend',
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER || 'user',
      host: process.env.DEPLOY_HOST || '158.160.215.176',
      ref: process.env.DEPLOY_REF || 'origin/master',
      repo: process.env.DEPLOY_REPO || 'https://github.com/KatyaVarentsova/nodejs-pm2-deploy.git',
      path: process.env.DEPLOY_PATH || '/home/user/nodejs-pm2-deploy',
      'post-deploy': `
        bash post-build.sh
      `.replace(/\n/g, ' '),
    },
  },
};
