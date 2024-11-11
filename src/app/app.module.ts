import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { ChansonsComponent } from './chansons/chansons.component';
import { AddChansonComponent } from './add-chanson/add-chanson.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateChansonComponent } from './update-chanson/update-chanson.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { RechercherParAlbumComponent } from './rechercher-par-album/rechercher-par-album.component';
import { RechercherParTitreComponent } from './rechercher-par-titre/rechercher-par-titre.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeAlbumsComponent } from './liste-albums/liste-albums.component';
import { UpdateAlbumsComponent } from './update-albums/update-albums.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerifEmailComponent } from './verif-email/verif-email.component';

@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    ChansonsComponent,
    AddChansonComponent,
    UpdateChansonComponent,
    RechercherParAlbumComponent,
    RechercherParTitreComponent,
    SearchFilterPipe,

    ListeAlbumsComponent,
    UpdateAlbumsComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    VerifEmailComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  
    ToastrModule.forRoot(),


  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
