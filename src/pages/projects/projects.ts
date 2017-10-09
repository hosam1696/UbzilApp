import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  ubzilLoader: boolean = false;
  projectID: string = 'myProjects';
  isIos: boolean = false;
  isRTL: boolean;
  constructor(
    public navCtrl: NavController,
    public appUtils: AppUtilFunctions,
    public modalCtrl: ModalController
  ) {
    this.isRTL = this.appUtils.platform.isRTL
  }

  ionViewWillEnter() {
    this.isRTL = this.appUtils.platform.isRTL;
    console.log(this.appUtils.GetPlatform, 'is pltform is RTL', this.isRTL)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');

    this.isIos = this.appUtils.GetPlatform === 'ios' ? true : false;

    

   
  }


  protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
    if (isModal) {
      let EditProfileModal = this.modalCtrl.create(page, {pageData});
      EditProfileModal.present();
      EditProfileModal.onDidDismiss(dismissData => {
        // Saving this info to local storage after updating user profile info
        //#region various pages code
        if (page === 'EditProfile') {

        } else if (page === 'Contactus') {

        }
        //endregion

      })
    } else {
      this.navCtrl.push(page, pageData)
    }
  }

}
