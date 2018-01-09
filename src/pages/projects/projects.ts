import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
// Providers
import {TranslateService} from 'ng2-translate';
import { ProjectsProvider} from './../../providers/projects/project';

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {
  projectType: string = 'myProjects';
  isIos: boolean = false;
  isRTL: boolean;
  userLocal:any;
  showLoader: boolean = true;
  noData:boolean = false;
  myProjects: any[];
  recivedProjects: any[];
  impProjects: any[];
  pendProjects: any[];
  // for scroll 
  initLimit: number = 8;
  initStart: number = 0;
  moreData: boolean = true;
  pullingText:string;
  refreshingText:string;
  loadingText:string;
  // end scroll
  constructor(
    public navCtrl: NavController,
    public appUtils: AppUtilFunctions,
    public modalCtrl: ModalController,
    public projectsProvider: ProjectsProvider,
    public translateService: TranslateService,
  ) {
    console.log('*************** ProjectsPage ******************');
    this.isRTL = this.appUtils.platform.isRTL
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter in ProjectsPage');
    this.isRTL = this.appUtils.platform.isRTL;
    console.log(this.appUtils.GetPlatform, 'is pltform is RTL', this.isRTL);

    this.translateService.get('pullingText')
    .subscribe(value => {this.pullingText = value})

    this.translateService.get('refreshingText')
    .subscribe(value => {this.refreshingText = value})

    this.translateService.get('loadingText')
    .subscribe(value => {this.loadingText = value})

    this.appUtils.storage.get('localUserInfo')
    .then((data)=>{
      this.userLocal = data;
      if (this.userLocal.account_type == 'finder') {
          this.projectType = 'myProjects';
      }
      console.log('localUserInfo in ProjectsPage', this.userLocal);
      this.initStart = 0;
      this.getUserProjects(this.projectType, this.initLimit, this.initStart);
    })
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter in ProjectsPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad in ProjectsPage');
    this.isIos = this.appUtils.GetPlatform === 'ios' ? true : false;
  }
  
  onSegmentChange(projectType){
    console.log('onSegmentChange',projectType);
    this.showLoader = true;
    this.initStart = 0;
    this.noData = false;
    this.moreData = true;
    this.getUserProjects(projectType, this.initLimit, this.initStart);
    
  }

  // TODO: call it to access http service provider
  accessProjectsProvider(projectType, limit?: number, start?: number){
    let sentData ={
      "user_id": this.userLocal.id,
      "verifycode": this.userLocal.verifycode,
      "lang_code": this.appUtils.CurrentLang,
      "projectType": projectType,
      "start":start,
      "limit":limit
      
    };
    return this.projectsProvider.getUserProjects(sentData);
  } 
  // TODO: Get User Data IF who login Open other user profile
  getUserProjects(projectType, limit?: number, start?: number){
    this.accessProjectsProvider(projectType, limit, start).subscribe((data) => {
        if (data) {
          this.noData = false;
          if (projectType == 'myProjects') {
            console.log('My Projects response',data);
            this.myProjects = data;
          }else if(projectType == 'recivedProjects'){
            console.log('My recivedProjects response',data);
            this.recivedProjects = data;
          }
          else if(projectType == 'impProjects'){
            console.log('My impProjects response',data);
            this.impProjects = data;
          }else{
            console.log('My pendProjects response',data);
            this.pendProjects = data;
          }

        } else {
          console.warn('somthing went wrong when getting Projects')
          this.noData = true;
          console.log('noData', this.noData);
        }
      }, err => {
        this.showLoader = false;
        if (err.error instanceof Error) {
          console.warn('client side error', err);
        } else {
          console.warn('server side error', err);
        }
      }, () => {
        this.showLoader = false;
      })
  }
  
  // TODO: get more Projects when go to bottom
  fetchMoreData(event,projectType) {
    console.log(' there are more data ? ',this.moreData)
    if (this.moreData) {
      this.accessProjectsProvider(projectType,this.initLimit, this.initStart += this.initLimit)
        .subscribe((data) => {
          if (data) {
            console.log('this.initStart' , this.initStart, 'data.length' , data.length);
            if (projectType == 'myProjects') {
              console.log('My Projects response data',data);
              this.myProjects = [...this.myProjects, ...data];
              console.log('My Projects',this.myProjects);
            }else if(projectType == 'recivedProjects'){
              this.recivedProjects = [...this.recivedProjects, ...data];
            }else if(projectType == 'impProjects'){
              this.impProjects = [...this.impProjects, ...data];
            }else{
              this.pendProjects = [...this.pendProjects, ...data];
            }

            (data.length >= this.initLimit) ? this.moreData = true : this.moreData = false;

          }else{
            this.moreData = false;
          }
        },
        (err) => {
          event.complete();
          console.warn('error', err) // catch net error acceccsing database
        },
        () => {
          event.complete();
        }
        );

    } else {
      event.complete();
      console.log('there is no data');
      return false;
    }
  }

  // TODO: refresh providers list when go to top
  refreshProjects(event,projectType) {
    this.initStart = 0;
    this.moreData = true;
    this.getUserProjects(projectType, this.initLimit, this.initStart);
    console.log('refreshed ');
    event.complete();
  }
 
  imagePath(img) {
    return this.appUtils.UPLOAD_FOLDER+img
  }

  protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
    if (isModal) {
      let EditProfileModal = this.modalCtrl.create(page, {pageData});
      EditProfileModal.present();
      EditProfileModal.onDidDismiss(dismissData => {
        // Saving this info to local storage after updating user profile info

        if (page === 'EditProfile') {
          // Do some interesting stuff here

        } else if (page === 'AddProjectRating') {
          console.log('backed',dismissData);
          // todo: update order status to 2(excuted)
          this.myProjects[dismissData].status = '2';

        }

      })
    } else {
      console.log('in navigate to ', pageData)
      this.navCtrl.push(page,{pageData})
    }
  }

  deleteOrder(orderId,index){
    let sentData ={
      "user_id": this.userLocal.id,
      "verifycode": this.userLocal.verifycode,
      "order_id":orderId,
    };
    console.log('delete order clicked', orderId);
    this.projectsProvider.deleteOrder(sentData).subscribe((data) => {
      if (data) {
        this.translateService.get('Request_successfully_canceled')
        .subscribe( value => {this.appUtils.AppToast(value)});

        this.myProjects.splice(index, 1);

      }
    }, err => {
      if (err.error instanceof Error) {
        console.warn('client side error', err);
      } else {
        console.warn('server side error', err);
      }
    }, () => {
    })
  }

}
