import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  projectID: string = 'myProjects';
  isIos:boolean = false;
  constructor(
    public navCtrl: NavController,
    public appUtils: AppUtilFunctions,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');

    this.isIos = this.appUtils.GetPlatform === 'ios' ? true : false;

    console.log(this.appUtils.GetPlatform)

   
  }


  protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
    if (isModal) {
      let EditProfileModal = this.modalCtrl.create(page, {pageData});
      EditProfileModal.present();
      EditProfileModal.onDidDismiss(dismissData => {
        // Saving this info to local storage after updating user profile info

        if (page === 'EditProfile') {
          // Do some interesting stuff here

        } else if (page === 'Contactus') {
          // Do some interesting stuff here

        }

      })
    } else {
      this.navCtrl.push(page)
    }
  }

}
