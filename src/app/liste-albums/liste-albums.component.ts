import { Component } from '@angular/core';
import { Album } from '../model/album.model';
import { ChansonService } from '../services/chanson.service';

@Component({
  selector: 'app-liste-albums',
  templateUrl: './liste-albums.component.html',
  styles: ``
})
export class ListeAlbumsComponent {
  albums! : Album[];
  ajout:boolean=true;

  updatedAlb:Album = {
    "idAlbum": 0, "titreAlbum": "",
    "proprietaireAlbum": ""
  };
  constructor(private chansonService : ChansonService) { }
  ngOnInit(): void {
  this.chansonService.listeAlbums().
  subscribe(cats => {this.albums = cats._embedded.albums;
  console.log(cats);
  });
  }

 albumUpdated(cat:Album){
    console.log("Cat updated event",cat);
    this.chansonService.ajouterAlbum(cat).
     subscribe( ()=> this.chargerAlbums());
    }


    chargerAlbums(){
      this.chansonService.listeAlbums().
      subscribe(cats => {this.albums = cats._embedded.albums;
      console.log(cats);
      });
      }

      updateAlb(Alb:Album) {
        this.updatedAlb=Alb;
        this.ajout=false;
        }
        
}
