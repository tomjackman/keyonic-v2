declare var require: any
import { Component } from '@angular/core';
import { KeycloakService } from '../../services/keycloak.service';
import kcRealmRoles from "../../config/realmRoles";
import viewGuardRules from "../../config/viewGuardRules";
var _ = require('underscore');

@Component({
  selector: 'page-access',
  templateUrl: 'access.html'
})
/**
 * Contains properties of the Access Page.
 */
export class AccessPage {
realmRoles: any;
userRoles: any;

  /**
  * @param keycloak The Keycloak Service
  */
  constructor(private keycloak: KeycloakService) {
    // the keypress realm roles that exist on the server
    this.realmRoles = kcRealmRoles;
    this.userRoles = [];
    this.keycloak = keycloak;
  }

  /**
   * Checks what realm roles the user is assigned and also unassigned for displaying in the UI
   */
  checkAccess(): void {
      // get the roles assigned to the user
      this.userRoles = this.keycloak.getRealmRoles();
      // find which roles the user does not have by comparing them with the defiend keycloak roles on the server
      this.realmRoles = _.difference(this.realmRoles, this.userRoles);
  }

  /**
   * Call the checkAccess() funnction when the page has fully entered and is now the active page.
   */
  ionViewDidEnter(): void {
    this.checkAccess();
  }

  /**
  * Check Auth state before rendering the view to allow/deny access for rendering this view
  */
  ionViewCanEnter(): boolean {
    return this.keycloak.viewGuard(viewGuardRules.default);
  }

}
