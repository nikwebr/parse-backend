#!/usr/bin/env node
// Example express application adding the parse-server module to expose Parse
// compatible API routes.

const https = require('https');
const fs = require('fs');

const credentials = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
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
  appId: process.env.APP_ID || 'ysnditBilling',
  masterKey: process.env.MASTER_KEY || 'N29aB2U49MoCNmBCS7JC1mPARDYmcKow71W9Y0sgVY1AKFcMjLk4IUAx9XEghPhKq1uuS4FMY7b1O6EMavlgwMWQhXnPbLjcug8n', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'https://159.69.177.168:443/api', // Don't forget to change to https if needed
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
};
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

const app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/api';
  const api = new ParseServer(ysnditBilling_config);
  app.use(mountPath, api);


const options = { allowInsecureHTTP: false };

const dashboard = new ParseDashboard({
	"apps": [
    {
      "serverURL": "https://159.69.177.168:443/api",
      "appId": "ysnditBilling",
      "masterKey": "N29aB2U49MoCNmBCS7JC1mPARDYmcKow71W9Y0sgVY1AKFcMjLk4IUAx9XEghPhKq1uuS4FMY7b1O6EMavlgwMWQhXnPbLjcug8n",
      "appName": "ysnditBilling"
    }
  ],
	"users": [
    {
      "user":"admin",
      "pass":"$2y$12$Al3tBePuiSea9eVgYKFcWefgG70PwkdqCUlJiJPz6RBdT4N.qtlJi"
    }
		],
	"useEncryptedPasswords": true
}, options);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('S02.NWEBER.DE Backend Server');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
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
