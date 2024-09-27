require('dotenv').config()

export default {
  appName: process.env.APP_NAME || 'Default App',
  port: process.env.APP_PORT || 3000
};
