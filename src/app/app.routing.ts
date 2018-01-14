import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { OrderComponent } from './order/order.component';
import { AddressComponent } from './address/address.component';
import { SettingsComponent } from './settings/settings.component';

import { LoginComponent } from 'app/login/login.component';
import { MainComponent } from 'app/main/main.component';

import { UserGuard } from './guard/user.guard';
import { CheckOutComponent } from 'app/checkout/checkout.component';
import { CheckOutGuard } from 'app/Guard/checkout.guard';



const routes: Routes =[
    
    { path: 'login',  component: LoginComponent },
    { path: '', redirectTo: 'app/dashboard',pathMatch:'full' },
    {path: 'app', component: MainComponent,canActivate: [UserGuard],
          children: [
            { path: 'dashboard',      component: DashboardComponent},
            { path: 'user-profile',   component: UserProfileComponent   },
            { path: 'order',          component: OrderComponent         },
            { path: 'address',        component: AddressComponent       },
            { path: 'settings',       component: SettingsComponent      },
            { path: 'checkout',       component: CheckOutComponent ,canActivate:[CheckOutGuard]},
                    ]
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
