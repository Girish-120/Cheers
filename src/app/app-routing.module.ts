import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccountComponent } from './account/account.component';
import { AuthguardGuard } from './authguard.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { FaqComponent } from './faq/faq.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { Page404Component } from './page404/page404.component';
import { PartnersComponent } from './partners/partners.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'main', component:MainPageComponent},
  {path:'signup', component:SignUpComponent},
  {path:'login',component:LoginComponent},
  {path:'faq', component:FaqComponent,canActivate:[AuthguardGuard]},
  {path:'about', component:AboutUsComponent,canActivate:[AuthguardGuard]},
  {path:'partners', component:PartnersComponent,canActivate:[AuthguardGuard]},
  {path:'accounts', component:AccountComponent,canActivate:[AuthguardGuard]},
  {path:'restaurants', component:RestaurantsComponent,canActivate:[AuthguardGuard]},
  {path:'favourites', component:FavouritesComponent,canActivate:[AuthguardGuard]},
  {path:'orderHistory', component:OrderHistoryComponent,canActivate:[AuthguardGuard]},
  {path:'checkout', component:CheckoutComponent,canActivate:[AuthguardGuard]},
  {path:'**', component:Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
