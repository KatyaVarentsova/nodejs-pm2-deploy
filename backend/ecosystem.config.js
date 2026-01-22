module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm run start',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://localhost:27017/mestodb',
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER || 'user',
      host: process.env.DEPLOY_HOST || '158.160.215.176',
      ref: process.env.DEPLOY_REF || 'origin/master',
      repo: process.env.DEPLOY_REPO || 'https://github.com/KatyaVarentsova/nodejs-pm2-deploy.git',
      path: process.env.DEPLOY_PATH || '/home/user/nodejs-pm2-deploy',
      ssh_options: `StrictHostKeyChecking=no -i ${process.env.DEPLOY_SSH_KEY || '~/.ssh/id_ed25519'}`,
      'post-deploy': 'cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};
