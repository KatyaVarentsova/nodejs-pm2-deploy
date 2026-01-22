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
      'post-deploy': 'cd frontend && /home/user/.nvm/versions/node/v22.22.0/bin/npm i && export NODE_OPTIONS=--openssl-legacy-provider && /home/user/.nvm/versions/node/v18.16.0/bin/npm run build && sudo mkdir -p /var/www/html && sudo cp -r build/* /var/www/html/ && sudo chown -R www-data:www-data /var/www/html && sudo chmod -R 755 /var/www/html',

    },
  },
};
