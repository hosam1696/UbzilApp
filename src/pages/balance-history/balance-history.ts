// Main Components
import {Component} from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
//import { DateFormatPipe } from 'angular2-moment';
// Providers
import {TranslateService} from 'ng2-translate';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
    selector: 'page-balance-history',
    templateUrl: 'balance-history.html',
})
export class BalanceHistory {
    showLoader: boolean = true;
    pageParams: any;
    userBalances: any;
    initLimit: number = 10;
    initStart: number = 0;
    moreData: boolean = true;
    pullingText:string;
    refreshingText:string;
    loadingText:string;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
        public viewCtrl: ViewController,
        public userProvider: UserProvider,
        public translateService: TranslateService,
    ) {
         console.log('*************** BalanceHistory ******************');
        this.pageParams = this.navParams.get('pageData');
        console.log('pageParams >>> ', this.pageParams);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translateService.get('pullingText')
        .subscribe(value => {this.pullingText = value})

        this.translateService.get('refreshingText')
        .subscribe(value => {this.refreshingText = value})

        this.translateService.get('loadingText')
        .subscribe(value => {this.loadingText = value})

        this.fetchBalanceOperations(this.pageParams.id, this.initLimit, this.initStart);


    }
        
    calledForFunc(){
        for (let index = 0; index < this.userBalances.length; index++) {
            if (this.userBalances[index]['type'] == '1') {

                this.translateService.get('add_balance_msg_1')
                .subscribe(value => {this.userBalances[index]['balanceMsg'] = value});

                this.translateService.get('add_balance_msg_1_complete')
                .subscribe(value => {this.userBalances[index]['balanceMsgComplete'] = value});


            }else if (this.userBalances[index]['type'] == '2') {

                this.translateService.get('minus_balance_msg_2')
                .subscribe(value => {this.userBalances[index]['balanceMsg'] = value});

                this.translateService.get('minus_balance_msg_2_complete')
                .subscribe(value => {this.userBalances[index]['balanceMsgComplete'] = value});

                this.userBalances[index]['balance'] = -this.userBalances[index]['balance'];

            }else if(this.userBalances[index]['type'] == '3'){

                this.translateService.get('add_balance_msg_3')
                .subscribe(value => {this.userBalances[index]['balanceMsg'] = value});

                this.translateService.get('add_balance_msg_3_complete')
                .subscribe(value => {this.userBalances[index]['balanceMsgComplete'] = value});

            }else if(this.userBalances[index]['type'] == '5'){
                
                this.translateService.get('add_balance_msg_5')
                .subscribe(value => {this.userBalances[index]['balanceMsg'] = value});

                this.translateService.get('add_balance_msg_5_complete')
                .subscribe(value => {this.userBalances[index]['balanceMsgComplete'] = value});
                
            }else{

                this.translateService.get('add_memberShip_balance_msg_4')
                .subscribe(value => {this.userBalances[index]['balanceMsg'] = value});
                this.userBalances[index]['balance'] = -this.userBalances[index]['balance'];
            }
        }
    }

    fetchBalanceOperations(id, limit?: number, start?: number){
     this.userProvider.getBalanceOperations({"user_id": id, "limit" : limit, "start" :start}).subscribe((data) => {
        if (data) {
            console.log('balances history From server', data);
            this.userBalances = data;
            this.calledForFunc();
        }
        
     }, err => {
        //this.loader = false;
        if (err.error instanceof Error) {
            console.warn('client side errror', err)
        } else {
            console.warn('server side error', err)
        }
     }, () => {
        this.showLoader = false;
     })
    }

    // TODO: get more balance history list when go to bottom
    fetchMoreData(event) {
        console.log(' there are more data ? ',this.moreData)
        if (this.moreData) {
          this.userProvider.getBalanceOperations({"user_id": this.pageParams.id, "limit" : this.initLimit, "start" :this.initStart += this.initLimit})
            .subscribe((data) => {
            console.log('fetch more balances history From server', data);
              if (data) {
                console.log(data.length,'this.initStart' , this.initStart);
                console.log('data.length' , data.length);
                this.userBalances = [...this.userBalances, ...data]; //es6 destruction : concat data to the providers array 
                 this.calledForFunc(); 
                if (data.length >= this.initLimit){
                  this.moreData = true;
                }else{
                  this.moreData = false;
                }
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
    
    // TODO: refresh balance history list when go to top
    refreshBalanceHistory(event) {
        this.initStart = 0;
        this.fetchBalanceOperations(this.pageParams.ids,this.initLimit, this.initStart);
        event.complete();
    }

    
    MessagesDetail() {
    let MessagesDetailModal = this.modalctrl.create('MessagesDetail');
    MessagesDetailModal.present();
    MessagesDetailModal.onDidDismiss(data => {
        // Saving this info to local storage after updating user profile info
    })

    }

   dismiss(data) {
    this.viewCtrl.dismiss(data);
  }

}
