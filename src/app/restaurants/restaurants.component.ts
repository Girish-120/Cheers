import { Component, OnInit } from '@angular/core';

declare var $:any;
declare const multiSlider: any;
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    multiSlider();

    $('#details_screen').hide();
  }

  restDetails(){
    $('#mainDiv').hide();
    $('#details_screen').show();
  }

}
