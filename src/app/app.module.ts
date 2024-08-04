import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule } from '@angular/common/http';

import { PanelManagerComponent } from './manager-panel/manager-panel.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurentDashComponent } from './restaurent-dash/restaurent-dash.component';
import { LoginComponent } from './Admin-login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RestaurantgustsComponent } from './restaurantgusts/restaurantgusts.component';
import { managerlogincomponent } from './manager-login/manager-login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { UserService } from './shared/services/user.service';
import { RestaurantService } from './shared/services/restaurant.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MonitorComponent } from './monitor/monitor.component';
import { RestaurantgustsLandingComponent } from './restaurantgusts-landing/restaurantgusts-landing.component';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    AppComponent,
    PanelManagerComponent,
    RestaurentDashComponent,
    LoginComponent,
    SignupComponent,
    RestaurantgustsComponent,
    managerlogincomponent,
    MonitorComponent,
    RestaurantgustsLandingComponent,
  ],
  
  imports: [
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoader,
        deps:[HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [managerlogincomponent,LoginComponent,UserService,RestaurantService,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http);
}
