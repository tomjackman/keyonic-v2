import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';
import viewGuardRules from "../../config/viewGuardRules";

@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
  providers: [KeycloakService]
})
/**
 * Contains properties of the Server Page.
 */
export class ServerPage {
keycloakConfiguration: object;

  /**
  * @param keycloak The Keycloak Service
  * @param navCtrl The Ionic Navigation Controller
  */
  constructor(private keycloak: KeycloakService, public navCtrl: NavController) {
    this.keycloak = keycloak;
    this.navCtrl = navCtrl;
    this.keycloakConfiguration = {};
  }

  /**
  * Load the server configuration for displaying in the UI
  */
  loadServerInfo() {
    this.keycloakConfiguration = this.keycloak.getConfiguration();
  }

  /**
  * Call the loadServerInfo() funnction when the page has fully entered and is now the active page.
  */
  ionViewDidEnter() {
    this.loadServerInfo();
  }

  /**
  * Check Auth state before rendering the view to allow/deny access for rendering this view
  */
  ionViewCanEnter(): boolean {
    return this.keycloak.viewGuard(viewGuardRules.server);
  }

}
