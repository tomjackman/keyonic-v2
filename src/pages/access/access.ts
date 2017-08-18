declare var require: any
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';
var _ = require('underscore');

@Component({
  selector: 'page-access',
  templateUrl: 'access.html'
})
export class AccessPage {
realmRoles: any;
userRoles: any;

  constructor(public navCtrl: NavController, private keycloak: KeycloakService) {
    // the keypress realm roles that exist on the server
    this.realmRoles = ["user:read","user:account:read","user:account:update","user:access:read","user:server:read","user:secrets:read","user:comments:read",
    "user:comments:create","user:comments:update","user:comments:delete","user:posts:read","user:posts:create","user:posts:update","user:posts:delete"];
    this.userRoles = [];
  }

  checkAccess() {
      this.userRoles = this.keycloak.getRealmRoles();
      // find which roles the user does not have
      this.realmRoles = _.difference(this.realmRoles, this.userRoles);
    }

  ionViewDidEnter(): void {
    this.checkAccess();
  }

}
