import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [KeycloakService]
})
export class HomePage {
rootPage: any;

  constructor(public navCtrl: NavController, private keycloak: KeycloakService) {

  }

  login(): void {
    // Redirect to Login
    this.keycloak.login();
  }

}
