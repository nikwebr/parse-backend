#!/usr/bin/env node
// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const https = require('https');
const fs = require('fs');

const credentials = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const path = require('path');
const args = process.argv || [];

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

const ysnditBilling_config = {
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'YOUR-APP-ID',
  masterKey: process.env.MASTER_KEY || 'YOUR-MASTER-KEY', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://YOUR-IP-ADDRESS:443/api', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
};
const options = { allowInsecureHTTP: false };
const dashboard = new ParseDashboard({
	"apps": [
    {
      "serverURL": "https://YOUR-IP-ADDRESS:443/api",
      "appId": "YOUR-APP-ID",
      "masterKey": "YOUR-MASTER-KEY",
      "appName": "YOUR-CUSTOM-APP-NAME"
    }
  ],
	"users": [
    {
      "user":"admin",
      "pass":"YOUR-PASSWORD"
    }
		],
	"useEncryptedPasswords": true
}, options);

const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/api';
  const api = new ParseServer(ysnditBilling_config);
  app.use(mountPath, api);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.redirect('https://nweber.de');
});

const port = process.env.PORT || 443;

  const httpServer = https.createServer(credentials, app);
  httpServer.listen(port, function () {
    console.log('parse-backend running on port ' + port + '.');
  });
  // This will enable the Live Query real-time server
  ParseServer.createLiveQueryServer(httpServer);

module.exports = {
  app,
  ysnditBilling_config,
};
