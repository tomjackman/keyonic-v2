import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';

@Component({
  selector: 'page-server',
  templateUrl: 'server.html',
  providers: [KeycloakService]
})
export class ServerPage {
keycloakConfiguration: object;

  constructor(public navCtrl: NavController, private keycloak: KeycloakService) {
    this.keycloakConfiguration = {};
  }

  loadServerInfo() {
    this.keycloakConfiguration = this.keycloak.getConfiguration();
    console.log(this.keycloakConfiguration);
  }

  ionViewDidEnter() {
    this.loadServerInfo();
  }


}
