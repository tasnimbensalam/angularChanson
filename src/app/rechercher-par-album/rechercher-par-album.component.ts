import { Component } from '@angular/core';
import { Album } from '../model/album.model';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
@Component({
  selector: 'app-rechercher-par-album',
  templateUrl: './rechercher-par-album.component.html',
  styles: ``
})
export class RechercherParAlbumComponent {
  chansons! : Chanson[];
IdAlbum! : number;
Albums! : Album[];
constructor(private chansonService: ChansonService) {}
  ngOnInit(): void {
    this.chansonService.listeAlbums().
    subscribe(albs => {this.Albums = albs._embedded.albums;
    console.log(albs);
    });
    }

    onChange() {
      this.chansonService.rechercherParAlbum(this.IdAlbum).
      subscribe(chans =>{this.chansons=chans});
      }
}
