import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ToastrModule  } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CountToModule } from 'angular-count-to';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderComponent } from './order/order.component';
import { AddressComponent } from './address/address.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from 'app/login/login.component';
import { MainComponent } from 'app/main/main.component';
import { CheckOutComponent } from 'app/checkout/checkout.component';


import { UserGuard } from './guard/user.guard';
import { AuthenticationService } from './services/authentication.service';
import { LoaderService } from 'app/services/loader.service';
import { UserService } from 'app/services/user.service';
import { ProductsService } from 'app/services/products.service';
import { DataService } from 'app/services/data.service';
import { CheckOutGuard } from 'app/Guard/checkout.guard';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    OrderComponent,
    AddressComponent,
    SettingsComponent,
    LoginComponent,
    MainComponent,
    CheckOutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CountToModule,
    ToastrModule.forRoot({
    }),
    
  ],
  providers: [
                UserGuard,
                AuthenticationService,
                LoaderService,
                UserService,
                ProductsService,
                DataService,
                CheckOutGuard,
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
