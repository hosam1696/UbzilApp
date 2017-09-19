// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController, ToastController} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';

// Req Pages


@IonicPage()
@Component({
    selector: 'page-work-time',
    templateUrl: 'work-time.html',
})
export class WorkTime {
    days: any[];
    public x: number;
    public y: number;
    isDone: boolean = false;
    
    closetext:any;
    toasttext:any;
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public translate: TranslateService,
        private toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
    ) {
        this.days = [
            {"id": 0, "name": "Saturday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 1, "name": "Sunday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 2, "name": "Monday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 3, "name": "Tuesday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 4, "name": "Wednesday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 5, "name": "Thursday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
            {"id": 6, "name": "Friday", "checked": false, "timeTable": [{"from": this.x, "to": this.y}]},
        ];
        for (let day in this.days) {
            console.log("today is " + this.days[day].name);
        }

    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translate.get('Changes-saved')
            .subscribe(lang => {
                this.toasttext = lang;
            })
        this.translate.get('Close')
            .subscribe(lang => {
                this.closetext = lang;
            })

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

    dayCheck(day) {
        console.log("this day is " + day.name);
    }


    detectCheck(val, day) {
        day.checked = val;
        console.log(val, day);
    }

    addmore(day) {
        console.log("add more button" + day.timeTable);
        var p = {"from": this.x, "to": this.y};
        day.timeTable.push(p);
    }
    remove(i, timeTable) {
        let dayIndex = this.days.findIndex(day => day.timeTable == timeTable);
        console.log(i, timeTable);
        console.log('Index of the day we work on', dayIndex);
        this.days[dayIndex].timeTable.splice(i, 1);
    }

    SaveChanges() {
        this.dismiss();
        let toast = this.toastCtrl.create({
            message: this.toasttext,
            position: "middle",
            showCloseButton: true,
            closeButtonText: this.closetext,
            duration: 3000
        });
        toast.present();
    }

}