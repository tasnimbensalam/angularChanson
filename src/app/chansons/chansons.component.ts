import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';
import { Image } from '../model/image.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chansons',
  templateUrl: './chansons.component.html',
  styleUrl: './chansons.component.css'
})

export class ChansonsComponent {
  apiurl:string='http://localhost:8080/chansons/api';
    chansons! : Chanson[];
    isImageLoading: { [key: number]: boolean } = {}; 
    constructor(private chansonService: ChansonService ,public authService:AuthService,private cd: ChangeDetectorRef) {
     // this.chansons = this.chansonService.listeChansons(); 
      }
      ngOnInit(): void {
      
          this.chargerChansons();
        this.chansonService.listeChansons().subscribe(chans => {
        console.log(chans);
        this.chansons = chans;
        });
        }
     
            
supprimerChanson(chans: Chanson): void {
  let conf = confirm("Etes-vous sûr ?");
  if (conf && chans.idChanson !== undefined) {
    this.chansonService.supprimerChanson(chans.idChanson).subscribe(() => {
      console.log("chanson supprimée");
      this.chargerChansons();
    });
  } else {
    console.error('idChanson is undefined or null');
  }
}
/*chargerChansons(){
  this.chansonService.listeChansons().subscribe(prods => {
  this.chansons = prods;
  });
  }*/
  
/*chargerChansons(){
  this.chansonService.listeChansons().subscribe(chans=> {
    console.log(chans); 
  this.chansons=  chans  ;
  this.chansons.forEach(( chan ) => {
     chan.imageStr = 'data:' +  chan.images[0].type + ';base64,' +  chan.images[0].image;
     
    });
  });  
    }*/
    chargerChansons(): void {
      this.chansonService.listeChansons().subscribe(chansons => {
        this.chansons = chansons;
  
        // Fetch image for each Chanson
        this.chansons?.forEach(chanson => {
          if (chanson.idChanson) {
            this.chansonService.getImagesForIngredient(chanson.idChanson).subscribe((img: Image[]) => {
              // Check if an image is available
              if (img.length > 0) {
                chanson.imageStr = 'data:' + img[0].type + ';base64,' + img[0].image;
              } else {
                chanson.imageStr = ''; // Initialize with empty string if no image
                console.log(`No image found for Chanson ${chanson.titreChanson}`);
              }
            });
          }
        });
      });
    }
}

