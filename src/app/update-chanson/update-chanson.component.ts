import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChansonService } from '../services/chanson.service';
import { Chanson } from '../model/chanson.model';
import { Album } from '../model/album.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-update-chanson',
  templateUrl: './update-chanson.component.html',
  styles: ``
})
export class UpdateChansonComponent implements OnInit  {
  albums! : Album[];
  myImage! : string;
  updatedAlbumId! :number;
  currentChanson = new Chanson();
  constructor(private activatedRoute: ActivatedRoute,private router :Router,

  private chansonService: ChansonService) { }

  ngOnInit() {
    /*this.albums = this.chansonService.listeAlbums();

    this.currentChanson = this.chansonService.consulterchanson(this.activatedRoute.snapshot. params['id']);
    this.updatedAlbumId=this.currentChanson.album.idAlbum;*/
    this.chansonService.listeAlbums().
subscribe(cats => {this.albums = cats._embedded.albums;
console.log(cats);
});
    this.chansonService.consulterChanson(this.activatedRoute.snapshot.params['id']).
 subscribe( chan =>{ this.currentChanson = chan;
  this.updatedAlbumId=this.currentChanson.album.idAlbum;
  this.chansonService.loadImage(this.currentChanson.image.idImage).subscribe((img: Image) => {
    this.myImage = 'data:' + img.type + ';base64,' + img.image;  // Set the image to be displayed
  });
});

   
    }


    updateChanson() {
      /*this.currentChanson.album=this.chansonService.consulterAlbum(this.updatedAlbumId);
      this.chansonService.updateChanson(this.currentChanson);
      this.router.navigate(['chansons']);*/

      this.currentChanson.album=this.albums.find(album =>album.idAlbum == this.updatedAlbumId)!;
      this.chansonService.updateChanson(this.currentChanson).subscribe(prod => {
        this.router.navigate(['chansons']); }
        );
    }
    
}
