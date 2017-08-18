import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  providers: [KeycloakService]
})
export class AccountPage {
account: object = {};

  keycloakConfiguration: object;

  constructor(public navCtrl: NavController, private keycloak: KeycloakService) {
    this.keycloakConfiguration = this.keycloak.getConfiguration();
  }

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

  ionViewDidEnter() {
    this.loadUserProfile();
  }

  logout() {
    // Redirect to Logout
    this.keycloak.logout();
  }

  accountManagement() {
    // Redirects to the Account Management Console
    this.keycloak.accountManagement();
  }

  clearToken() {
    // Clears Authentication State
    this.keycloak.clearToken();
  }

}
