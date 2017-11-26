import { Component, ElementRef, Renderer2, Input, OnInit } from '@angular/core';


@Component({
  selector: 'uz-loader',
  templateUrl: 'uzloader.html'
})
export class UzloaderComponent implements OnInit{
  @Input('relative') relative: boolean = true;
  @Input('full') full: boolean = true;
  text: string;

  constructor(public eleRef: ElementRef, public rendrer: Renderer2) {  }

  ngOnInit() {
    let eleQuery = this.eleRef.nativeElement;

    //console.log(this.relative, this.eleRef.nativeElement, this.eleRef.nativeElement.querySelector('#loader-holder'));


    this.rendrer.addClass(eleQuery.querySelector('#loader-holder'), !this.relative ? 'abs-loader' : 'rel-loader');

    this.rendrer.addClass(eleQuery.querySelector('.loader'), this.full?'full-width':'small')
  
  
  }

}
