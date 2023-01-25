import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  openSideNavBar:boolean = true;
  openSideNavBar_1:boolean=false;

  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem("token")){
      this.openSideNavBar_1 = true;
      this.openSideNavBar = false;
    }
  }

}
