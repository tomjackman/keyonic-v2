import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { KeycloakService } from '../../services/keycloak.service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
  providers: [KeycloakService]
})
export class UserPage {
profile: any = {};

  constructor(public navCtrl: NavController, private keycloak: KeycloakService, public alertCtrl: AlertController) {

  }

  showUserInfo() {
   let alert = this.alertCtrl.create({
     title: 'User ID',
     subTitle: '<small>' + this.profile.id + '</small>',
     buttons: ['Ok']
   });
   alert.present();
 }

  loadUserProfile(): void {
    this.keycloak.loadUserProfile().then((profile) => {
      console.log(profile);
      this.profile = {
        username: profile.username ? profile.username : "Unknown Username",
        firstName: profile.firstName ? profile.firstName : "Unknown First Name",
        lastName: profile.lastName ? profile.lastName : "Unknown Last Name",
        avatar: profile.attributes.avatar ? profile.attributes.avatar[0] : "Unknown Avatar",
        createdTimestamp: profile.createdTimestamp ? this.timeConverter(profile.createdTimestamp) : "Unknown Created Timestamp",
        id: profile.id ? profile.id : "Unknown User ID",
        job: profile.attributes.job ? profile.attributes.job[0] : "Unknown Job",
        summary: profile.attributes.summary ? profile.attributes.summary[0] : "Unknown Summary"
      };
    })
    .catch((err) => console.error("Error retrieving user profile", err));
    }

  ionViewDidEnter(): void {
    this.loadUserProfile();
  }

  ionViewCanEnter(): void {
    // TODO Check Auth state to allow/deny access for rendering this view
  }

  timeConverter(timestamp): string {
    var a = new Date(timestamp * 1000);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + hour + ':' + min;
  return time;
}

}
