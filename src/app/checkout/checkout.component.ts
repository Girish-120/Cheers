import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormBuilder , Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  openSideNavBar:boolean = true;
  openSideNavBar_1:boolean=false;

  Orders:any;

  constructor(private service:AppserviceService, private fb:FormBuilder) { }

  ngOnInit() {
    this.service.waitLoader = false;

    if(sessionStorage.getItem("token")){
      this.openSideNavBar_1 = true;
      this.openSideNavBar = false;
    }

    this.getOrders();
  }

  getOrders(){
    this.service.getApi("getOrders").subscribe((data:any)=>{
       if(data.success == true){
        this.Orders = data.data[0];
         this.service.waitLoader = false;
       }
     });
  }

  // Cancel Order
  cancelOrder(Order:any){
      this.CancelOrderForm.controls.placeOrderId.setValue(Order);
  }
  
  CancelOrderForm = this.fb.group({
      placeOrderId:["", Validators.required]
  })
  
  cancelOrderSubmit(){
      this.service.waitLoader = true;
      
      this.service.put("/cancelOrder", this.CancelOrderForm.value).subscribe((data:any)=>{
        if(data.success == true){
         console.log(data);
         
          this.service.waitLoader = false;
        }
      })
  }

}
