module.exports = {
  apps: [
    {
      name: 'backend',
      script: './dist/app.js',
      cwd: './backend',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
        DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://localhost:27017/mestodb',
      },
    }
  ],
  deploy: {
    production: {
      user: process.env.DEPLOY_USER || 'user',
      host: process.env.DEPLOY_HOST || '158.160.215.176',
      ref: process.env.DEPLOY_REF || 'origin/master',
      repo: process.env.DEPLOY_REPO || 'https://github.com/KatyaVarentsova/nodejs-pm2-deploy.git',
      path: process.env.DEPLOY_PATH || '/home/user/nodejs-pm2-deploy',
      ssh_options: `StrictHostKeyChecking=no -i ${process.env.DEPLOY_SSH_KEY || 'C:/vm_access/key.ssh'}`,
      'post-deploy': `
        cd current/backend &&
        npm install &&
        npm run build &&
        cd ../frontend &&
        export NODE_OPTIONS=--openssl-legacy-provider &&
        npm install &&
        npm run build &&
        pm2 reload backend --env production
      `.replace(/\n/g, ' '),
    }
  }
};
