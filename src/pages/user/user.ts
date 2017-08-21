import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';
import { AlertController } from 'ionic-angular';
import viewGuardRules from "../../config/viewGuardRules";

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers: [KeycloakService]
})
/**
 * Contains properties of the User Page.
 */
export class UserPage {
profile: any;

  /**
  * @param keycloak The Keycloak Service
  * @param alertCtrl The ionic alert controller
  * @param navCtrl The Ionic Navigation Controller
  */
  constructor(private keycloak: KeycloakService, public alertCtrl: AlertController, public navCtrl: NavController) {
    this.keycloak = keycloak;
    this.alertCtrl = alertCtrl;
    this.navCtrl = navCtrl;
    this.profile = {};
  }

  /**
   * Show user info in a popup
   */
  showUserInfo(): void {
   let alert = this.alertCtrl.create({
     title: 'User ID',
     subTitle: '<small>' + this.profile.id + '</small>',
     buttons: ['Ok']
   });
   alert.present();
 }

 /**
  * Get and format the Users profile for displaying in the UI
  */
  loadUserProfile(): void {
    this.keycloak.loadUserProfile().then((profile) => {
      this.profile = {
        username: profile.username ? profile.username : "Unknown Username",
        firstName: profile.firstName ? profile.firstName : "Unknown First Name",
        lastName: profile.lastName ? profile.lastName : "Unknown Last Name",
        avatar: profile.attributes.avatar ? profile.attributes.avatar[0] : "Unknown Avatar",
        id: profile.id ? profile.id : "Unknown User ID",
        email: profile.email ? profile.email : "Unknown User Email",
        job: profile.attributes.job ? profile.attributes.job[0] : "Unknown Job",
        summary: profile.attributes.summary ? profile.attributes.summary[0] : "Unknown Summary"
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
  * Check Auth state before rendering the view to allow/deny access for rendering this view
  */
  ionViewCanEnter(): boolean {
    return this.keycloak.viewGuard(viewGuardRules.default);
  }

}
