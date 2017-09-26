import { Component } from '@angular/core';


@Component({
  selector: 'uz-loader',
  templateUrl: 'uzloader.html'
})
export class UzloaderComponent {

  text: string;

  constructor() {
    console.log('Hello UzloaderComponent Component');
   // this.text = 'Hello World';
  }

}
