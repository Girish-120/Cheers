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

  constructor(private service:AppserviceService , private fb:FormBuilder , private router:Router , private toaster:ToastrService) { }

  ngOnInit() {
    $("#loginScreen").show();
    $("#loginpassScreen").hide();
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
        localStorage.setItem('token',JSON.stringify(data.data.token));
      }
    })
  }



}
