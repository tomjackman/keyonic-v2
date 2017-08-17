declare var require: any
import { Injectable } from '@angular/core';
var keycloakConfig = require('../config/keycloak.json');

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};
  rootPage:any;

  constructor() {

  }

  static init(): Promise<any> {
    // Create a new Keycloak Client Instance
    let keycloakAuth: any = new Keycloak(keycloakConfig);

      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: 'login-required', flow: 'implicit' }).success(() => {
            console.log(keycloakAuth);
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
  getConfiguration(): object {
    var notAvailable = "N/A";
    return {
      "Auth Server URL": KeycloakService.auth.authz.authServerUrl ? KeycloakService.auth.authz.authServerUrl : notAvailable,
      "OpenID Connect Flow": KeycloakService.auth.authz.flow ? KeycloakService.auth.authz.flow : notAvailable,
      "OpenID Response Mode": KeycloakService.auth.authz.responseMode ? KeycloakService.auth.authz.responseMode : notAvailable
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
}
