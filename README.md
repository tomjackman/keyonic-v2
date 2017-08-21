## Keyonic-V2
A Keycloak Mobile Implementation using Angular v4 and Ionic v3.

![](./keyonic-v2-overview.gif)

## Version 2 Enhancements
* Implementation with Angular 4/Typescript/Ionic 3
* ViewGuard - View level access is protected based on a Role
* More Keycloak functions used and information served

## Requirements
* Apache Cordova
* Node 6 LTS
* Ionic 3
* Keycloak Server

`npm install -g ionic cordova`

## Installation
The following configuration was used for this application.

```
{
  "realm": "keypress",
  "url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "clientId": "keyonic-v2",
  "public-client": true,
  "use-resource-role-mappings": true
}
```
You can import the keyonic-v2 Realm (`keyonic-v2-realm.json`) and Users (`keyonic-v2-users.json`) JSON files [here](https://github.com/TommyJ1994/keypress/tree/master/keycloak) to populate Keycloak with the correct configuration.

* Under the Realms section in Keycloak, add a new Realm with the Import option.
* Import the `keyonic-v2-realm.json` file.
* Once complete, visit the newly created realm and click the 'Import' button at the bottom left of the sidebar. You will import the users here. Choose the `keyonic-v2-users.json` file.

You must first have a running Keycloak instance running as the Keycloak JS Adapter is being fetched from the Keycloak server itself, rather than via npm.

Note: In this sample application, Keycloak is expected to be already running off `localhost:8080`. This can be changed however in `www/index.html` under `<script src="http://localhost:8080/auth/js/keycloak.js"></script>`

Run `ionic serve --address localhost` to start the application.

Ensure that you have the Web Origin configured in Keycloak. eg `*` or other. (This should be done when you import the realm)

Also ensure that the redirectUri is pointing to where the ionic dev server is running. eg. `http://localhost:8100/*` (Only if your ionic app is running on a different URL)

## Usage

User Credentials:

* `keypress-admin/admin`

* `areader/123`

* `apublisher/123`