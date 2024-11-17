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
  uploadedImage!: File;
isImageUpdated: Boolean=false;
  constructor(private activatedRoute: ActivatedRoute,private router :Router,

  private chansonService: ChansonService) { }

  /*ngOnInit() {
    /*this.albums = this.chansonService.listeAlbums();

    this.currentChanson = this.chansonService.consulterchanson(this.activatedRoute.snapshot. params['id']);
    this.updatedAlbumId=this.currentChanson.album.idAlbum;
    this.chansonService.listeAlbums().
subscribe(cats => {this.albums = cats._embedded.albums;
console.log(cats);
});
    this.chansonService.consulterChanson(this.activatedRoute.snapshot.params['id']).
 subscribe( chan =>{ this.currentChanson = chan;
  this.updatedAlbumId=this.currentChanson.album.idAlbum;
  this.chansonService.loadImage(this.currentChanson.image.idImage).subscribe((img: Image) => {
    this.myImage = 'data:' + img.type + ';base64,' + img.image; 
  });
});
*/
ngOnInit(): void {
  this.chansonService.listeAlbums().
  subscribe(cats => {this.albums = cats._embedded.albums;
  });
  this.chansonService.consulterChanson(this.activatedRoute.snapshot.params['id'])
  .subscribe( chan =>{ this.currentChanson = chan;
  this.updatedAlbumId = chan.album.idAlbum;
  } ) ;
  }
    


    /*updateChanson() {
      /*this.currentChanson.album=this.chansonService.consulterAlbum(this.updatedAlbumId);
      this.chansonService.updateChanson(this.currentChanson);
      this.router.navigate(['chansons']);

      this.currentChanson.album=this.albums.find(album =>album.idAlbum == this.updatedAlbumId)!;
      /*this.chansonService.updateChanson(this.currentChanson).subscribe(prod => {
        this.router.navigate(['chansons']); }
        );
        if (this.isImageUpdated)
          {
          this.chansonService
          .uploadImage(this.uploadedImage, this.uploadedImage.name)
          .subscribe((img: Image) => {
          this.currentChanson.image = img;
          this.chansonService
          .updateChanson(this.currentChanson)
          .subscribe((prod) => {
          this.router.navigate(['chansons']);
          });
          });
          }
          else{
          this.chansonService
          .updateChanson(this.currentChanson)
          .subscribe((prod) => {
          this.router.navigate(['chansons']);
          });
          }
          }*/
         updateChanson() {
            this.currentChanson.album = this.albums.find(cat => cat.idAlbum ==
            this.updatedAlbumId)!;
            this.chansonService
            .updateChanson(this.currentChanson)
            .subscribe((prod) => {
            this.router.navigate(['chansons']);
            });
            }
    
    onImageUpload(event: any) {
      if(event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated =true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => { this.myImage = reader.result as string; };
      }
      }

      onAddImageChanson() {
        console.log("Current Chanson ID:", this.currentChanson?.idChanson);

        if (this.currentChanson.idChanson !== undefined) {
            this.chansonService
                .uploadImageChanson(this.uploadedImage, this.uploadedImage.name, this.currentChanson.idChanson)
                .subscribe((img: Image) => {
                    this.currentChanson.images.push(img);
                });
              
        } else {
            console.error("currentChanson or idChanson is undefined");
        }
    }
    
        supprimerImage(img: Image){
          let conf = confirm("Etes-vous sûr ?");
          if (conf)
          this.chansonService.supprimerImage(img.idImage).subscribe(() => {
        
          const index = this.currentChanson.images.indexOf(img, 0);
          if (index > -1) {
          this.currentChanson.images.splice(index, 1);
          }
          });
          }
    
}
