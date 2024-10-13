import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { ChansonsComponent } from './chansons/chansons.component';
import { AddChansonComponent } from './add-chanson/add-chanson.component';
import { FormsModule } from '@angular/forms';
import { UpdateChansonComponent } from './update-chanson/update-chanson.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { RechercherParAlbumComponent } from './rechercher-par-album/rechercher-par-album.component';
import { RechercherParTitreComponent } from './rechercher-par-titre/rechercher-par-titre.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeAlbumsComponent } from './liste-albums/liste-albums.component';
import { UpdateAlbumsComponent } from './update-albums/update-albums.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 

  ],
  providers: [[provideHttpClient()],
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
