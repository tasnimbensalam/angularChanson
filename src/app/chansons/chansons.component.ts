
import { Component } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';


@Component({
  selector: 'app-chansons',
  templateUrl: './chansons.component.html',
  styleUrl: './chansons.component.css'
})

export class ChansonsComponent {
  apiurl:string='http://localhost:8080/chansons/api';
    chansons! : Chanson[]; 
    constructor(private chansonService: ChansonService ) {
     // this.chansons = this.chansonService.listeChansons(); 
      }
      ngOnInit(): void {
      
          this.chargerChansons();
        this.chansonService.listeChansons().subscribe(chans => {
        console.log(chans);
        this.chansons = chans;
        });
        }
     
            

chargerChansons(){
  this.chansonService.listeChansons().subscribe(prods => {
  this.chansons = prods;
  });
  }
  
/*chargerChansons(){
  this.chansonService.listeChansons().subscribe(prods=> {
  this.chansons=  prods  ;
  this.chansons.forEach(( prod ) => {
     prod.imageStr = 'data:' +  prod.images[0].type + ';base64,' +  prod.images[0].image;
    });
  });  */    }


