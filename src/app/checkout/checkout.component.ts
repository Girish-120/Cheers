import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

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
