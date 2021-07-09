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
2. Upgrade the Ubuntu packages already installed: <code>apt-get upgrade</code>
3. Install git: <code>apt-get install git</code>

## Install MongoDB
1. Install MongoDB. By default, MongoDB is available in the Ubuntu 20.04 default repository: <code>apt-get install mongodb-server -y</code>
2. Verify MongoDB status: <code>systemctl status mongodb</code>
3. which returns:
<code>● mongodb.service - An object/document-oriented database
     Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-11-03 15:43:50 UTC; 22s ago
       Docs: man:mongod(1)
   Main PID: 718 (mongod)
      Tasks: 23 (limit: 4915)
     Memory: 42.2M
     CGroup: /system.slice/mongodb.service
             └─718 /usr/bin/mongod --unixSocketPrefix=/run/mongodb --config /etc/mongodb.conf

Nov 03 15:43:50 scw-friendly-edison systemd[1]: Started An object/document-oriented database.</code>

## Install NodeJS
1. Add an external repository for the required version of NodeJS. Make sure to replace lts by the lastest node runtime: <code>curl -sL https://deb.nodesource.com/setup_lts.x | bash -</code>
2. Install NodeJS: <code>apt-get install nodejs -y</code>
3. Verify the NodeJS version: <code>node --version</code>




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
