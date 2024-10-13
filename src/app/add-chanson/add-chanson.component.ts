import { Component } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Album } from '../model/album.model';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-add-chanson',
  templateUrl: './add-chanson.component.html',
  styleUrls: ['./add-chanson.component.css'] 
})

export class AddChansonComponent {
  albums!: Album[];       
  newIdAlbum!: number;  
  newAlbum!: Album;        
  newChanson: Chanson = { 
    idChanson: 0,
   titreChanson: '',
    dureeChanson: 0,
    album: {
      idAlbum: 0,
      titreAlbum: '',
      proprietaireAlbum: ''
    }
  };

  constructor(private chansonService: ChansonService, private router: Router) { }
  ngOnInit() {
   // this.albums = this.chansonService.listeAlbums();
    this.chansonService.listeAlbums().
    subscribe(cats => {this.albums = cats._embedded.albums;
    console.log(cats);
});

    }
    
 /* addChanson() {
  
    this.newAlbum = this.chansonService.consulterAlbum(this.newIdAlbum);
    this.newChanson.album = this.newAlbum;
    this.chansonService.ajouterChanson(this.newChanson);

    this.router.navigate(['chansons']);
  }*/
    addChanson(){
      this.newChanson.album = this.albums.find(cat => cat.idAlbum == this.newIdAlbum)!;
      this.chansonService.ajouterChanson(this.newChanson)
      .subscribe(chans => {
      console.log(chans);
      this.router.navigate(['chansons']);
      });
      }
}
