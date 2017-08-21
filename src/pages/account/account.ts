import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';
import viewGuardRules from "../../config/viewGuardRules";

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [KeycloakService]
})
/**
 * Contains properties of the Account Page.
 */
export class AccountPage {
account: object;

  /**
  * @param keycloak The Keycloak Service
  * @param navCtrl The Ionic Navigation Controller
  */
  constructor(private keycloak: KeycloakService) {
    this.keycloak = keycloak;
    this.account = {};
  }

  /**
  * Load and format the user profile for displaying in the UI
  */
  loadUserProfile(): void {
    this.keycloak.loadUserProfile().then((profile) => {
      this.account = {
        enabled: profile.enabled ? profile.enabled : false,
        totp: profile.totp ? profile.totp : false,
        emailVerified: profile.emailVerified ? profile.emailVerified : false,
        credentialTypes: profile.disableableCredentialTypes ? profile.disableableCredentialTypes: []
      };
    })
    .catch((err) => console.error("Error retrieving user profile", err));
    }

  /**
  * Call the loadUserProfile() funnction when the page has fully entered and is now the active page.
  */
  ionViewDidEnter(): void {
    this.loadUserProfile();
  }

  /**
  * Redirect to Logout
  */
  logout(): void {
    this.keycloak.logout();
  }

  /**
  * Redirects to the Account Management Console
  */
  accountManagement(): void {
    this.keycloak.accountManagement();
  }

  /**
  * Clears Authentication State
  */
  clearToken(): void {
    this.keycloak.clearToken();
  }

  /**
  * Check Auth state before rendering the view to allow/deny access for rendering this view
  */
  ionViewCanEnter(): boolean {
    return this.keycloak.viewGuard(viewGuardRules.default);
  }

}
