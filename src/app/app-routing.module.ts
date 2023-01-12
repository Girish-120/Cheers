import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PartnersComponent } from './partners/partners.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'main', component:MainPageComponent},
  {path:'signup', component:SignUpComponent},
  {path:'login',component:LoginComponent},
  {path:'faq', component:FaqComponent},
  {path:'about', component:AboutUsComponent},
  {path:'partners', component:PartnersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
