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

      'post-deploy': 'cd frontend && npm i && export NODE_OPTIONS=--openssl-legacy-provider && npm run build && sudo mkdir -p ' + (NGINX_STATIC_PATH || '/var/www/html') + ' && sudo cp -r build/* ' + (NGINX_STATIC_PATH || '/var/www/html') + '/ && sudo chown -R www-data:www-data ' + (NGINX_STATIC_PATH || '/var/www/html') + ' && sudo chmod -R 755 ' + (NGINX_STATIC_PATH || '/var/www/html'),

    },
  },
};
