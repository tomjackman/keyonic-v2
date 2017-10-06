declare var require: any
import { Injectable } from '@angular/core';
var keycloakConfig = require('../config/keycloak.json');
import { AlertController } from 'ionic-angular';

declare var Keycloak: any;

@Injectable()
/**
 * Contains properties of the Keycloak Service.
 */
export class KeycloakService {
  static auth: any = {};

  /**
  * @param alertCtrl The ionic alert controller
  */
  constructor(public alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }

  /**
  * Initialise the Keycloak Client Adapter
  */
  static init(): Promise<any> {
    // Create a new Keycloak Client Instance
    let keycloakAuth: any = new Keycloak(keycloakConfig);

      return new Promise((resolve, reject) => {
        keycloakAuth.init({ onLoad: 'login-required', flow: 'implicit' }).success(() => {
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/" + keycloakConfig.realm + "/protocol/openid-connect/logout?redirect_uri=/";
            resolve();
          }).error((err) => {
            reject(err);
          });
      });
    }
  /**
  * Redirect to logout
  */
  logout(): void {
    KeycloakService.auth.authz.logout();
  }
  /**
   * Redirect to Login
   */
  login(): void {
    KeycloakService.auth.authz.login();
  }
  /**
   * Clears Authentication State
   */
  clearToken(): void {
    KeycloakService.auth.authz.clearToken();
  }
  /**
   * Return the users realm level roles
   */
  getRealmRoles(): void {
    return KeycloakService.auth.authz.realmAccess.roles;
  }
  /**
   * Check if the user has a specified realm role
   */
  hasRealmRole(role: String): boolean {
    return KeycloakService.auth.authz.hasRealmRole(role);
  }
  /**
   * Get Server/Open ID Connect specific server info
   */
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
  /**
   * Redirects to the Account Management Console
   */
  accountManagement(): void {
    KeycloakService.auth.authz.accountManagement();
  }
  /**
   * Get the users profile
   */
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
  /**
   * Check if the user has a given role
   * @param role The role to check if the user posesses
   */
  viewGuard(role: string): boolean {
      if(KeycloakService.auth.authz.hasRealmRole(role)) {
        return true
      } else {
        this.alertCtrl.create({title: 'Access Denied', subTitle: "You don't have access to the requested resource."}).present();
        return false;
      }
  }
}
