import { Component, OnInit } from '@angular/core';

declare var $:any;
declare const multiSlider: any;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    multiSlider();

    $("#exploreLiqour").hide();
    $("#exploreVodaka").hide();
    $("#featuredProduct").hide();
  }

  explore_Liquor(){
    $("#exploreLiqour").show();
    $("#mainDiv").hide();
  }

  backToHome(){
    $("#exploreLiqour").hide();
    $("#mainDiv").show();
  }

  explore_Vodaka(){
    $("#exploreVodaka").show();
    $("#exploreLiqour").hide();
  }
  backToLiquor(){
    $("#exploreVodaka").hide();
    $("#exploreLiqour").show();
  }

  featured_product(){
    $("#featuredProduct").show();
    $("#exploreVodaka").hide();
  }
  backToVodaka(){
    $("#featuredProduct").hide();
    $("#exploreVodaka").show();
  }

}
