import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChansonsComponent } from './chansons/chansons.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';


import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
  keycloak.init({
  config: {
  url: 'http://localhost:8080',
  realm: 'tesnim-realm',
  clientId: 'chanson-app'
  },
  initOptions: {
  /*onLoad :'login-required',
  checkLoginIframe: true*/
  onLoad: 'check-sso',

  silentCheckSsoRedirectUri:
  window.location.origin + '/assets/silent-check-sso.html' 
  }
  });
}
@NgModule({
  declarations: [
    AppComponent,
  
    ChansonsComponent,
  


 

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  

    ToastrModule.forRoot(),
    KeycloakAngularModule,

  ],
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
      }
      
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
