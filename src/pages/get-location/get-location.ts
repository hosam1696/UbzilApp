import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
    selector: 'page-get-location',
    templateUrl: 'get-location.html',
})

export class GetLocation {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    pageParams: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public geolocation: Geolocation
    ) {
        this.pageParams = this.navParams.get('pageData');

        console.log('getlocation data', this.pageParams);
    }
    ionViewDidLoad() {
        this.loadMap();
        console.log('get location modal')

    }

    

    loadMap() {

        this.geolocation.getCurrentPosition()
          .then((position:Geoposition) => {

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

    dismiss(direct:boolean = false) {
        if (this.navParams && this.pageParams.lat && this.pageParams.lng&&!direct)
            this.navCtrl.push('UserList', { pageData: this.pageParams })
        else 
            this.viewCtrl.dismiss(this.pageParams);
            
  }
}


