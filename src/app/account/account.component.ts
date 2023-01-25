import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { ToastrService } from "ngx-toastr";
import { FormBuilder , Validators} from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  getProfile:any;
  isChecked:boolean = false;
  getAddress:any;
  updateAddress:any;

  openSideNavBar:boolean = true;
  openSideNavBar_1:boolean=false;

  constructor(private service:AppserviceService ,private toaster:ToastrService, private fb:FormBuilder) { }

  ngOnInit() {
    this.getProfileDet();
    this.getAllAddress();

    if(sessionStorage.getItem("token")){
      this.openSideNavBar_1 = true;
      this.openSideNavBar = false;
    }
  }

  getProfileDet(){
    this.service.getApi("getprofile").subscribe((data:any)=>{
       if(data.success == true){
        this.getProfile = data.data[0];
         if (this.getProfile.enableNotification == true) {
           this.isChecked = true;
         }
       }
     });
  }

  getAllAddress(){
    this.service.getApi("getAllAddress").subscribe((data:any)=>{
      if(data.success == true){
       this.getAddress = data.data;
      }
    });
  }

  // Update Details
  updateDetailsForm = this.fb.group({
    first_name:["",Validators.required],
    last_name:["",Validators.required],
    email:["",Validators.required]
  })

  updateSubmit(){
    this.service.post("/updateProfile/", this.updateDetailsForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.getProfileDet();
      }
      
    })
  }

// Change Password
  changePassForm = this.fb.group({
    oldpassword:["",Validators.required],
    newpassword:["",Validators.required],
    confirmpassword:["",Validators.required]
  })

  changePassSubmit(){
    this.service.post("/changePassword", this.changePassForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.getProfileDet();
      }
      
    })
  }

  // Address
  newAddressFrom = this.fb.group({
    address:["",Validators.required],
    latitude:["",Validators.required],
    longitude:["",Validators.required],
    type:["",Validators.required]
  })

  newAddressSubmit(){
    this.service.post("/insertAddress", this.newAddressFrom.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.getAllAddress();
        this.newAddressFrom.reset();
        $('.modal').modal('hide');
      }
      
    })
  }

  // Update Address
  updateAdd(address:any){
    this.updateAddress = address;
    this.UpdateAddressFrom.controls.address.setValue(address.address);
    this.UpdateAddressFrom.controls.address_id.setValue(address._id);
    this.UpdateAddressFrom.controls.latitude.setValue(address.latitude.toString());
    this.UpdateAddressFrom.controls.longitude.setValue(address.longitude.toString());
  }

  UpdateAddressFrom = this.fb.group({
    address_id:["", Validators.required],
    address:["",Validators.required],
    type:["",Validators.required],
    latitude:["",Validators.required],
    longitude:["",Validators.required]
  })

  UpdateAddressSubmit(){
    console.log(this.UpdateAddressFrom.value);
    
    this.service.put("/updateAddress", this.UpdateAddressFrom.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.getAllAddress();
        this.UpdateAddressFrom.reset();
        $('.modal').modal('hide');
      }
    })
  }

  // Delete Address 
  deleteAdd(d:any){
    this.service.delete("/deleteAddress",d).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.getAllAddress();
      }
    })
  }



}
