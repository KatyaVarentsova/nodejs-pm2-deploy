require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/master',
  PORT = 3000,
  DB_ADDRESS = 'mongodb://localhost:27017/mestodb',
} = process.env;

module.exports = {
  apps: [
    {
      name: "backend",
      script: "./dist/app.js",
      cwd: "./backend",
      env_production: {
        NODE_ENV: "production",
        PORT,
        DB_ADDRESS,
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,

      "post-deploy": `
      cd current/backend &&
      npm install &&
      npm run build &&
      cd ../frontend &&
      export NODE_OPTIONS=--openssl-legacy-provider &&
      npm install &&
      npm run build &&
      pm2 reload backend --env production
      `.replace(/\n/g, " "),
    },
  },
};
