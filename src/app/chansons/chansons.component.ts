import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { ChansonService } from '../services/chanson.service';

@Component({
  selector: 'app-chansons',
  templateUrl: './chansons.component.html',
  styleUrl: './chansons.component.css'
})

export class ChansonsComponent {
  
    chansons! : Chanson[]; 
    constructor(private chansonService: ChansonService ,public authService:AuthService) {
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

}

