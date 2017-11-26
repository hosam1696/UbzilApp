import {Component, ViewChild, ElementRef} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation';
import {IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';

declare var google;
// Providers

// Req Pages
import {UserList} from '../user-list/user-list';


@IonicPage()
@Component({
    selector: 'page-search-service',
    templateUrl: 'search-service.html',
})
export class SearchService {
    @ViewChild('map') mapElement: ElementRef;
    map: any;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public geolocation: Geolocation

    ) {

    }
    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap() {

        this.geolocation.getCurrentPosition().then((position) => {

            let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }

            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.addMarker();
        }, (err) => {
            console.log(err);
        });

    }

    addMarker() {

        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });

        let content = "<h4>Information!</h4>";

        this.addInfoWindow(marker, content);

    }


    addInfoWindow(marker, content) {

        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });

    }


    dismiss() {
        this.viewCtrl.dismiss();
    }
    gocompanyList() {
        this.navCtrl.push(UserList);
        this.dismiss();
    }



}
