import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Admin-login/login.component';
import { managerlogincomponent } from './manager-login/manager-login.component';
import { PanelManagerComponent } from './manager-panel/manager-panel.component';
import { MonitorComponent } from './monitor/monitor.component';
import { RestaurantgustsLandingComponent } from './restaurantgusts-landing/restaurantgusts-landing.component';
import { RestaurantgustsComponent } from './restaurantgusts/restaurantgusts.component';
import { RestaurentDashComponent } from './restaurent-dash/restaurent-dash.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch: 'full'
  },

  {
    path: 'admin-login', component: LoginComponent
  },

  {
    path: 'restaurant-admin', canActivate:[LoginComponent], component: RestaurentDashComponent
  },

 
  {
    path: 'manager-login', component: managerlogincomponent
  },
  
  {
    path: 'manager-panel', component: PanelManagerComponent, canActivate: [AuthGuard] 
  },

  {
    path: 'monitor/:restaurant_id', component: MonitorComponent

  },
  // {
  //   path: 'panelmanager/: restaurantname', component: PanelManagerComponent
  // },

  // {
  //   path: 'user/:username', component: UsersComponent
  // },
  
  

  {
    path: 'restaurantgusts/:token', component: RestaurantgustsComponent
  },
  {
    path: 'restaurantgusts-landing/:restaurant_id/:table_id', component: RestaurantgustsLandingComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
