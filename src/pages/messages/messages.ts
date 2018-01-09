import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Providers
import { MessagesProvider } from './../../providers/messages/messages';


@IonicPage()
@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html',
})
export class Messages {
    userLocal:any;
    convresationList:any;
    showLoader: boolean = true;
    noData: boolean = false;

    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public events: Events,
        public translateService: TranslateService,
        public appUtils: AppUtilFunctions,
        public messagesProvider: MessagesProvider,
 
    ) {
        console.log('*************** Messages ******************');

    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        this.appUtils.storage.get('localUserInfo')
            .then(data=>{
                this.userLocal = data;
                console.log('localUserInfo in MessagesDetail',this.userLocal);
                /* if (this.pageParams.user2) {
                    console.log('yes');
                }else{
                    console.log('no');
                    
                } */
                this.getAllConversation();
            });

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
         

    }

    getAllConversation(){
        let sentData ={
            "user_id": this.userLocal.id, 
            "lang_code":this.appUtils.CurrentLang,
            "verifycode":this.userLocal.verifycode,
        }
        this.messagesProvider.getAllConversation(sentData).subscribe((data) => {
            if (data) {
                this.convresationList = data;
                console.log('conversation details From server', this.convresationList); 
            }else{
                this.noData = true;
            }
            
        }, err => {
            this.showLoader = false;
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            this.showLoader = false;
        })
    }

    MessagesDetail(pageData) {
        let MessagesDetailModal = this.modalCtrl.create('MessagesDetail',{pageData});
        MessagesDetailModal.present();
        MessagesDetailModal.onDidDismiss(data => {
            console.log('here',data);
            let index = this.convresationList.findIndex(e => e.id === data['conversation_id']);
            this.convresationList[index]['message']    = data['message'];
            this.convresationList[index]['date_added'] = data['date_added'];
            let lastEdit = this.convresationList[index];
            this.convresationList.splice(index,1);
            this.convresationList.unshift(lastEdit);
            console.log('lists',this.convresationList);
        })

    }

    imagePath(img) {
        return this.appUtils.UPLOAD_FOLDER+img
    }



}
