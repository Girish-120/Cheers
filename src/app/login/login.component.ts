import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  show_button:any;
  show_eye:any;

  constructor(private service:AppserviceService , private fb:FormBuilder , private router:Router , private toaster:ToastrService) { }

  ngOnInit() {
    $("#loginScreen").show();
    $("#loginpassScreen").hide();

    $("#OtpFor").hide();
    $("#newPassFor").hide();
  }

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  changeScreen(){
    $("#loginScreen").hide();
    $("#loginpassScreen").show();
  }

  loginForm = this.fb.group({
    username:["",Validators.required],
    password:["",Validators.required]
  })

  loginFormSubmit(){
    console.warn(this.loginForm.value);
    this.service.post("/login",this.loginForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success')
        console.warn(data);
        this.router.navigateByUrl("/main");
        sessionStorage.setItem('token', data.data.token)
      }
    })
  }


  // Forgot PassWOrd--

  emailForgotForm = this.fb.group({
    email:['', Validators.required]
  })

  emailForgotSubmit(){
    this.service.post("/forgotPassword",this.emailForgotForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.otpMatchForm.controls.otp.setValue(data.data.otp);
        this.otpMatchForm.patchValue({"email":this.emailForgotForm.value.email});

        $("#OtpFor").show();
        $("#emailFor").hide();
      }
    })
  }

  otpMatchForm = this.fb.group({
    otp:['', Validators.required],
    email:['', Validators.required]
  })

  otpMatchSubmit(){
    this.service.post("/matchCode",this.otpMatchForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        this.resetPassForm.controls.cutomerId.setValue(data.data.customerId);

        $("#OtpFor").hide();
        $("#newPassFor").show();
      }
    })
  }

  resetPassForm = this.fb.group({
    cutomerId:['', Validators.required],
    password:['', Validators.required]
  })

  resetPassSumbit(){
    this.service.post("/resetPassword",this.resetPassForm.value).subscribe((data:any)=>{
      if(data.success == true){
        this.toaster.success(data.message,'success');
        $('.modal').modal('toggle');
      }
    });
  }



}
