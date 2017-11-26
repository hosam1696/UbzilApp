import { ServicesProvider } from './../../../providers/services/services';
//import { IHomeServices, IHomeServiceResponse } from '../../app/appglobal/app.interfaces';
import { AppUtilFunctions } from './../../../app/appglobal/app.utilfuns';
// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, AlertController } from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
// Providers
// Req Pages
//import { UserList } from '../../user-list/user-list';
//import { AddRequest } from '../add-request/add-request';
//import { SearchService } from '../search-service/search-service';
@IonicPage()
@Component({
    selector: 'page-signcategory',
    templateUrl: 'signcategory.html',
})
export class SignCategory {

    searchQuery: string = '';
    pageData: any;
    subServices: any[];
    loader: boolean = true;
    noSearch: boolean = false;
    userServices:any[];
    alertTitle:string;
    alertSubTitle:string;
    alertAccept:string;
    alertRefuse:string;
    prevSignCategoryData:any;
    //showTypes: boolean = false; // to show main 3 types in array 
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translateService: TranslateService,
        public appUtils: AppUtilFunctions,
        public modalCtrl:ModalController,
        public servicesProvider: ServicesProvider,
        public events: Events,
        public alertCtrl: AlertController

    ) {
        console.log('****************** singCategory Load *******************');
        this.pageData = this.navParams.get('pageData');
        this.prevSignCategoryData = this.pageData.prevSignupData;
        console.log('page params Data geted',this.pageData);
        console.log('previous step from Sign :' , this.prevSignCategoryData);

        this.userServices = (this.pageData.serv instanceof Array) ? this.pageData.serv : [];
        console.log('userServices in constructor',this.userServices);
    }
    
    ionViewWillEnter() {}
    ionViewWillLeave() {}

    ionViewDidLoad() {
        this.getSubCategory();
    }

    getSubCategory(){
        if(!this.pageData.id){
            this.subServices = [
                {id: "0", type: "1", subCount:"1", ser_icon: "cleaner.png", service_name: "طلب خدمه"},
                {id: "0", type: "2", subCount:"1", ser_icon: "cleaner.png", service_name: "حجز موعد"},
                {id: "0", type: "3", subCount:"1", ser_icon: "cleaner.png", service_name: "خدمات قريبه"}
            ];

        }else{
            //console.log('ssssss')
            this.servicesProvider.getSubCategory(
            {
                "user_id": "3",
                "verifycode": "$2y$12$XQBdOjshGvoSRcT6uTlJaOkOiV.htMTyyT09IXxdjHrSQeoc/vgkO",
                "service_id": this.pageData.id,
                "type": this.pageData.type,
                "lang_code": this.appUtils.CurrentLang
            }
        ).subscribe(({ status, error, data}) => {
            if (status === 'success') {
                console.log('data from server',data,this.userServices);
                //console.log('userService Selected Lenght',Object.keys(this.userServices).length)
                // TODO: get lenght of array with strin key type use (Object.keys(yourArray).length )
                let parentName = data[0]['parent_name'];
                if(this.userServices[parentName]) {
                    //console.log('7anksha');
                    let servicesToChecked = this.userServices[parentName];
                    for (let i = 0;i < this.userServices[parentName].length;i++) {
                        console.info(servicesToChecked[i]);
                        for (let j = 0; j < data.length; j++) {
                            if(servicesToChecked[i].id == data[j]['id']){
                                data[j]['isCheked'] = 'yesChecked';
                            }
                        }                        
                    }
                }
                console.log('data from sub category after add isChecked',data)
                /*
                if(Object.keys(this.userServices).length > 0){ 
                    for (let i = 0; i < data.length; i++) {
                        if(this.userServices[data[i]['parent_name']]){
                            if(this.userServices[data[i]['parent_name']].indexOf({'id' : data[i]['id'],'name':data[i]['service_name']}) !== -1){
                                //console.log('222222333333',data[i]['id']);
                                data[i]['isCheked'] = 'yesChecked';
                           }
                        }
                    }
                    console.log('data from sub category after add isChecked',data)
                }*/
                this.subServices = data;                
                //console.log('data from sub category reverse',this.subServices)
            } else {
                this.appUtils.AppToast(error);
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side error', err);
                this.appUtils.AppToast('الرجاء المحاولة مرة اخرى');
            } else {
                console.warn('server side error ', err);
                this.appUtils.AppToast('الرجاء  المحالة مرة اخرى');
                this.loader = false
                
            }
            }, () => {
            this.loader = false
        })
        }
        
    }

    navigateTo(serviceDetails: {id:number, service_name:string, subCount: number, type: number}): void {

        //this.navCtrl.push('SignCategory', { pageData: { ...serviceDetails} })
        this.navCtrl.push('SignCategory', { pageData: { ...serviceDetails,serv:this.userServices? this.userServices:[],prevSignupData:this.prevSignCategoryData}})
    }
    
    changCheckBox(parentName, inputId, inputName, serviceType ,isChecked :boolean) {
        console.log(parentName , inputId , serviceType , isChecked);
        if(isChecked) {
            //console.log('userServices in checked',this.userServices)
            if(parentName in this.userServices){
                //this.userServices[parentName] = (this.userServices[parentName] instanceof Array) ? this.userServices[parentName] : [];
                
                //this.userServices[parentName].push(inputId);
                this.userServices[parentName].push({'id':inputId, 'name':inputName,"serviceType":serviceType});
            }else{
                //console.log(parentName,"not in array")
                console.log('userServices Selected Lenght',Object.keys(this.userServices).length)
                if(Object.keys(this.userServices).length <= 0){
                    this.userServices[parentName] = (this.userServices[parentName] instanceof Array) ? this.userServices[parentName] : [];
                    //this.userServices[parentName].push(inputId);
                    this.userServices[parentName].push({'id':inputId, 'name':inputName,"serviceType":serviceType});
                }else{
                    this.serviceConfirm(parentName,inputId,inputName,serviceType)
                    /* this.translateService.get('not-allowed-more-service')
                    .subscribe( value => {this.appUtils.AppToast(value)}) */
                    /* this.userServices = [];
                    this.userServices[parentName] = (this.userServices[parentName] instanceof Array) ? this.userServices[parentName] : [];
                    this.userServices[parentName].push(inputId); */ 
                }
            }
            
            
        } else {
            var _index = this.userServices[parentName].indexOf({'id':inputId, 'name':inputName,"serviceType":serviceType});
            this.userServices[parentName].splice(_index, 1);
        }

        /*if(isChecked) {
            this.userServices.forEach(
                (val, i, this.userServices)=>{
                    if (Object.keys(val)[0] == parentId){ 
                        this.userServices[i][Object.keys(val)[0]].push(inputId)
                    } else {
                        this.userServices.push({parentId: inputId});
                        //this.userServices.push({parentId: inputId,isChecked: true});
                    }
                })
        } else {
            this.userServices.forEach(
                (val, i, this.userServices)=>{
                    if (Object.keys(val)[0] == parentId){ 
                        this.userServices[i][Object.keys(val)[0]].splice(inputId, 1)
                    }
                })
        }*/
        console.log('user service that selected',this.userServices);
    }

    serviceConfirm(parentName,inputId,inputName,serviceType){

        this.translateService.get('select')
        .subscribe(value => {this.alertTitle = value});

        this.translateService.get('not-allowed-more-service')
        .subscribe(value => {this.alertSubTitle = value});

        this.translateService.get('Accept')
        .subscribe(value => {this.alertAccept = value});

        this.translateService.get('Refuse')
        .subscribe(value => {this.alertRefuse = value});


        let alert = this.alertCtrl.create({
            title: this.alertTitle,
            subTitle: this.alertSubTitle,
            buttons:[
                {
                    text: this.alertAccept,
                    handler: () => {
                        console.log("accepted Clicked");
                        this.userServices = [];
                        this.userServices[parentName] = (this.userServices[parentName] instanceof Array) ? this.userServices[parentName] : [];
                        //this.userServices[parentName].push(inputId);
                        this.userServices[parentName].push({'id':inputId, 'name':inputName,"serviceType":serviceType});
                        console.log('after click alertControool',this.userServices);
                    }
                },
                {
                    text: this.alertRefuse,
                    handler: function(){
                        console.log("unaccepted Clicked");
                    }
                }
            ]
        });
        alert.present();
    }

    navigateToStep5(): void {

        this.navCtrl.push('Signup', {userServicesPageData:{allServices :this.userServices,prevSignCategoryData:this.prevSignCategoryData}})
        //console.log('step 5 cliked')
    }

    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+'service/icons/'+img
    }

    /* getSignupMainCategory(type){
        this.servicesProvider.getSignupMainCategory({
            'lang_code': this.appUtils.CurrentLang,
            'type':type,
        }).subscribe((data) => {
            console.log('main services response',data);
                if (data) {          
                  this.mainServices = data;
                  this.comeFrom = 'signUpMAIN';
                } else {
                  console.warn('somthing went wrong when getting mainServices')
                }           
            },
            err => {
              if (err.error instanceof Error) {
                console.warn('client side error', err);
              } else {
                console.warn('server side error', err);
              }
            },
            () => {
            }
        )
    } */
    /* filterServices(ev: any) {
        
        let val = ev.target.value;
        this.noSearch = false;
        this.subServices = this.subServicesAlt;

        if (val && val.trim()) {
            this.subServices = this.subServices.filter((service) => {
                return (service.service_name.search(val) > -1);
            });
            if (this.subServices.length == 0) {
                console.log("this is empty");
                this.noSearch = true
            }
        }
    } */
    




}
