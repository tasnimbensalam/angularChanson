import { Component, OnInit } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Album } from '../model/album.model';
import { Router } from '@angular/router';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-chanson',
  templateUrl: './add-chanson.component.html',
  styleUrls: ['./add-chanson.component.css'] 
})
export class AddChansonComponent implements OnInit {
  albums!: Album[];       
  newIdAlbum!: number;  
  newAlbum!: Album; 
  uploadedImage!: File;
  imagePath: any;  
  idChanson!: number;
  newChanson = new Chanson();

  constructor(
    private chansonService: ChansonService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.chansonService.listeAlbums().subscribe(
      albs => {
        this.albums = albs._embedded.albums;
        console.log(albs);
      },
      error => {
        console.error('Error loading albums:', error);
      }
    );
  }

  /*addChanson(){
    this.chansonService
    .uploadImage(this.uploadedImage, this.uploadedImage.name)
    .subscribe((img: Image) => {
    this.newChanson.image=img;
    this.newChanson.album = this.albums.find(cat => cat.idAlbum
    == this.newIdAlbum)!;
    this.chansonService
    .ajouterChanson(this.newChanson)
    .subscribe(() => {
    this.router.navigate(['chansons']);
    });
    });
    }
*/
addChanson() {
  this.newChanson.album = this.albums.find(cat => cat.idAlbum == this.newIdAlbum)!;
  this.chansonService
    .ajouterChanson(this.newChanson)
    .subscribe((prod) => {
      this.chansonService
        .uploadImageFS(this.uploadedImage,
          this.uploadedImage.name, prod.idChanson!)
        .subscribe((response: any) => { }
        );
      this.router.navigate(['chansons']);
    });
}
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
    }
  
}