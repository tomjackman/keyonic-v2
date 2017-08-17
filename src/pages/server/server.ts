import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
  providers: [KeycloakService]
})
export class ServerPage {
account: any = {};

  keycloakConfiguration: object;

  constructor(public navCtrl: NavController, private keycloak: KeycloakService) {
    this.keycloakConfiguration = this.keycloak.getConfiguration();
  }

  ionViewDidEnter() {
    
  }


}
