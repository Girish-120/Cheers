import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { FormBuilder , Validators} from '@angular/forms';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  openSideNavBar:boolean = true;
  openSideNavBar_1:boolean=false;

  topSearch:any = [];

  constructor(private route:Router, private service:AppserviceService, private fb:FormBuilder) { }

  ngOnInit() {
    if(sessionStorage.getItem("token")){
      this.openSideNavBar_1 = true;
      this.openSideNavBar = false;
    }

    $('#searchDiv').hide();
    $('#listClose').hide();

    $(".searchBar").focus(function(){
      $('.locationSearch').hide();
      $('.deliverCheckbox').hide();
      $('#searchDiv').show();
      $('#listClose').show();
    });

    $(".searchBar").blur(function(){
      $('.locationSearch').show();
      $('.deliverCheckbox').show();
      $('#searchDiv').hide();
      $('#listClose').hide();
    });

    $("#listClose").click(function(){
      $('.locationSearch').show();
      $('.deliverCheckbox').show();
      $('#searchDiv').hide();
      $('#listClose').hide();
    });

   this.getSearchList();
  }

  getSearchList(){
    this.service.getApi("/get-search").subscribe((data:any)=>{
      this.topSearch = data.data.top;
    })
  }

  searchForm = this.fb.group({
    name:["", Validators.required],
  })
  
  searchChange(event:any){
    this.searchForm.controls.name.setValue(event.target.value);

    this.service.post("/insert-search", this.searchForm.value).subscribe((data:any)=>{
      console.log(data);
      this.getSearchList();
    });
  }

  signOut(){
    sessionStorage.clear();
    this.route.navigate(['/login']);
  }

}
