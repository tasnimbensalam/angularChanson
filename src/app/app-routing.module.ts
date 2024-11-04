import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChansonsComponent } from './chansons/chansons.component';
import { AddChansonComponent } from './add-chanson/add-chanson.component';
import { UpdateChansonComponent } from './update-chanson/update-chanson.component';
import { RechercherParAlbumComponent } from './rechercher-par-album/rechercher-par-album.component';
import { RechercherParTitreComponent } from './rechercher-par-titre/rechercher-par-titre.component';
import { ListeAlbumsComponent } from './liste-albums/liste-albums.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { chansonGuard } from './chanson.guard';



const routes: Routes = [{path: "chansons", component : ChansonsComponent},
{path: "add-chanson", component : AddChansonComponent, canActivate:[chansonGuard]},
{ path: "", redirectTo: "chansons", pathMatch: "full" 
},
{path: 'login', component: LoginComponent},
{path: "updateChanson/:id", component: UpdateChansonComponent},
{path: "rechercherParAlbum", component : RechercherParAlbumComponent},
{path: "rechercheParTitre", component : RechercherParTitreComponent},
{path: 'app-forbidden', component: ForbiddenComponent},


{path: "listeAlbums", component : ListeAlbumsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
