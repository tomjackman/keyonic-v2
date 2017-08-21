declare var require: any
import { Injectable } from '@angular/core';
var keycloakConfig = require('../config/keycloak.json');
import { AlertController } from 'ionic-angular';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  constructor(public alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }

  static init(): Promise<any> {
    // Create a new Keycloak Client Instance
    let keycloakAuth: any = new Keycloak(keycloakConfig);

      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: 'login-required', flow: 'implicit' }).success(() => {
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/keypress/protocol/openid-connect/logout?redirect_uri=/";
            resolve();
          }).error((err) => {
            reject(err);
          });
      });
    }
  logout(): void {
    // Redirect to logout
    KeycloakService.auth.authz.logout();
  }
  login(): void {
    // Redirect to Login
    KeycloakService.auth.authz.login();
  }
  clearToken(): void {
    // Clears Authentication State
    KeycloakService.auth.authz.clearToken();
  }
  getRealmRoles(): void {
    // Return the users realm level roles
    return KeycloakService.auth.authz.realmAccess.roles;
  }
  hasRealmRole(role: String): boolean {
    // check if the user has a specified realm role
    return KeycloakService.auth.authz.hasRealmRole(role);
  }
  getConfiguration(): object {
    var notAvailable = "N/A";
    return {
      "authServerUrl": KeycloakService.auth.authz.authServerUrl ? KeycloakService.auth.authz.authServerUrl : notAvailable,
      "openIdFlow": KeycloakService.auth.authz.flow ? KeycloakService.auth.authz.flow : notAvailable,
      "openIdResponseMode": KeycloakService.auth.authz.responseMode ? KeycloakService.auth.authz.responseMode : notAvailable,
      "openIdResponseType": KeycloakService.auth.authz.responseType ? KeycloakService.auth.authz.responseType : notAvailable,
      "realm": KeycloakService.auth.authz.realm ? KeycloakService.auth.authz.realm : notAvailable,
      "clientId": KeycloakService.auth.authz.clientId ? KeycloakService.auth.authz.clientId : notAvailable,
      "timeSkew": KeycloakService.auth.authz.timeSkew ? KeycloakService.auth.authz.timeSkew : notAvailable
    };
  }
  accountManagement(): void {
    // Redirects to the Account Management Console
    KeycloakService.auth.authz.accountManagement();
  }
  loadUserProfile(): any {
    // Retrieve User Profile
    return new Promise((resolve, reject) => {
      KeycloakService.auth.authz.loadUserProfile().success((profile) => {
        resolve(<object>profile);
      }).error(() => {
        reject('Failed to retrieve user profile');
      });
    });
  }
  viewGuard(role: string): boolean {
      if(KeycloakService.auth.authz.hasRealmRole(role)) {
        return true
      } else {
        this.alertCtrl.create({title: 'Access Denied', subTitle: "You don't have access to the requested resource."}).present();
        return false;
      }
  }
}
