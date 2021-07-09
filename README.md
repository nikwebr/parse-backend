# parse-backend <!-- omit in toc -->

Fork using the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express. Read the full [Parse Server Guide](https://docs.parseplatform.org/parse-server/guide/) for more information.

# Table of Contents <!-- omit in toc -->

- [Local Development](#local-development)
  - [Helpful Scripts](#helpful-scripts)
- [Using Parse Server](#using-parse-server)
  - [Health Check](#health-check)
  - [APIs and SDKs](#apis-and-sdks)
    - [REST API](#rest-api)
    - [JavaScript](#javascript)
    - [Android](#android)
    - [iOS / tvOS / iPadOS / macOS (Swift)](#ios--tvos--ipados--macos-swift)

# Local Development

## Prepare Installation
1. Update Ubuntu packet manager: <code>apt-get update</code>

## Install MongoDB

2. 
* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Install ngrok and you can test with devices

## Helpful Scripts
These scripts can help you to develop your app for Parse Server:

* `npm run watch` will start your Parse Server and restart if you make any changes.
* `npm run lint` will check the linting of your cloud code, tests and `index.js`, as defined in `.eslintrc.json`.
* `npm run lint-fix` will attempt fix the linting of your cloud code, tests and `index.js`.
* `npm run prettier` will help improve the formatting and layout of your cloud code, tests and `index.js`, as defined in `.prettierrc`.
* `npm run test` will run any tests that are written in `/spec`.
* `npm run coverage` will run tests and check coverage. Output is available in the `/coverage` folder.

# Using Parse Server

## Health Check

You can use the `/health` endpoint to verify that Parse Server is up and running. For example, for local deployment, enter this URL in your browser:

> [http://localhost:1337/parse/health](http://localhost:1337/parse/health)

If you deployed Parse Server remotely, change the URL accordingly.

## APIs and SDKs

Use the REST API, GraphQL API or any of the Parse SDKs to see Parse Server in action. Parse Server comes with a variety of SDKs to cover most common ecosystems and languages, such as JavaScript, Swift, ObjectiveC and Android just to name a few.

The following shows example requests when interacting with a local deployment of Parse Server. If you deployed Parse Server remotely, change the URL accordingly.

### REST API

Save object:
```sh
curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "Content-Type: application/json" \
  -d '{"score":1337}' \
  http://localhost:1337/parse/classes/GameScore
```

Call Cloud Code function:
```sh
curl -X POST \
  -H "X-Parse-Application-Id: YOUR_APP_ID" \
  -H "Content-Type: application/json" \
  -d "{}" \
  http://localhost:1337/parse/functions/hello
```

### JavaScript

```js
// Initialize SDK
Parse.initialize("YOUR_APP_ID", "unused");
Parse.serverURL = 'http://localhost:1337/parse';

// Save object
const obj = new Parse.Object('GameScore');
obj.set('score',1337);
await obj.save();

// Query object
const query = new Parse.Query('GameScore');
const objAgain = await query.get(obj.id);
```

### Android
```java
// Initialize SDK in the application class
Parse.initialize(new Parse.Configuration.Builder(getApplicationContext())
  .applicationId("YOUR_APP_ID")
  .server("http://localhost:1337/parse/")   // '/' important after 'parse'
  .build());

// Save object
ParseObject obj = new ParseObject("TestObject");
obj.put("foo", "bar");
obj.saveInBackground();
```

### iOS / tvOS / iPadOS / macOS (Swift)
```swift
// Initialize SDK in AppDelegate
Parse.initializeWithConfiguration(ParseClientConfiguration(block: {
  (configuration: ParseMutableClientConfiguration) -> Void in
    configuration.server = "http://localhost:1337/parse/" // '/' important after 'parse'
    configuration.applicationId = "YOUR_APP_ID"
}))
```
You can change the server URL in all of the open-source SDKs, but we're releasing new builds which provide initialization time configuration of this property.

[license-svg]: https://img.shields.io/badge/license-BSD-lightgrey.svg
[license-link]: LICENSE
[open-collective-link]: https://opencollective.com/parse-server
