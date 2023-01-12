import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormBuilder ,Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

declare var $:any;
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private service:AppserviceService , private fb:FormBuilder, private toastr:ToastrService) { }

  otpValue:Number;
  custId:number;
  firstName:any;

  ngOnInit() {
    $("#phoneOTP").hide();
    $("#information").hide();
    $("#emailVerify").hide();
    $("#finishedSignUp").hide();
    $("#ageVerification").show();
    $("#signUp").hide();
  }

  signUpForm = this.fb.group({
    countryCode:"+91",
    contactNo:["",Validators.required]
  })

  signUpSubmit(){
    this.service.post("/registerUser",this.signUpForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toastr.success(data.message, 'Success')
        console.log(data);
        $("#signUp").hide();
        $("#phoneOTP").show();
        $("#pass1").focus();
        this.otpValue = data.data.otp;
        this.otpForm.controls.otp.setValue(this.otpValue);
        this.otpForm.patchValue({"contactNo":this.signUpForm.value.contactNo})
      }
    })
  }

  otpForm = this.fb.group({
    countryCode: "+91",
    contactNo: [""],
    otp: [""]
  })

  otpFormSubmit(){
    this.service.post("/verifyMobile",this.otpForm.value).subscribe((data:any)=>{
      if(data.success == true){
        console.warn(data);
        this.toastr.success(data.message, 'Success')
        $("#signUp").hide();
        $("#phoneOTP").hide();
        $("#information").show();
        this.custId = data.data.customerId;
        this.informationForm.controls.customerId.setValue(this.custId);
      }
    })
  }

  informationForm = this.fb.group({
    customerId:"",
    email:["",Validators.required],
    first_name:["",Validators.required],
    last_name:["",Validators.required],
    password:["",Validators.required]
  })

  informationSubmit(){
    this.service.post("/registerEmail",this.informationForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toastr.success(data.message, 'Success')
        console.warn(data);
        $("#information").hide();
        $("#emailVerify").show();
        this.emailOtpForm.patchValue({"email":this.informationForm.value.email});
        this.emailOtpForm.patchValue({"otp":data.data.otp});

        this.ageVerifyForm.patchValue({"email":this.informationForm.value.email});
      }
    })
  }

  emailOtpForm = this.fb.group({
    email:["",Validators.required],
    otp:["",Validators.required]
  })

  emailOtpSubmit(){
    this.service.post("/verifyEmail",this.emailOtpForm.value).subscribe((data:any)=>{
      if(data.success == true){
        console.warn(data);
        $("#emailVerify").hide();
        $("#ageVerification").show();
        this.toastr.success(data.message, 'Success')
      }
    })
  }

  ageVerifyForm = this.fb.group({
    email:["",Validators.required],
    dob:["",Validators.required]
  })

  ageVerifySubmit(){
    console.log(this.ageVerifyForm.value);
    
    this.service.post("/verifyAge",this.ageVerifyForm.value).subscribe((data:any)=>{
      console.log(data);
      
    })
  }

}
