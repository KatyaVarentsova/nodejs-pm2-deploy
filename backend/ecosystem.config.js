module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'npm run start',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT,
        DB_ADDRESS: process.env.DB_ADDRESS,
      },
    },
  ],

  deploy: {
    production: {
      user: process.env.DEPLOY_USER,
      host: process.env.DEPLOY_HOST,
      ref: process.env.DEPLOY_REF,
      repo: process.env.DEPLOY_REPO,
      path: process.env.DEPLOY_PATH,
      ssh_options: `StrictHostKeyChecking=no -i ${process.env.DEPLOY_SSH_KEY}`,
      'post-deploy': `
      export NVM_DIR="$HOME/.nvm" &&
      [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" &&
       cd backend &&
       npm install &&
       npm run build &&
       pm2 reload ecosystem.config.js --env production
       `.replace(/\n/g, ' '),
    },
  },
};
