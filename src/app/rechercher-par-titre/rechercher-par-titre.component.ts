import { Component } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { Album } from '../model/album.model';
import { ChansonService } from '../services/chanson.service';

@Component({
  selector: 'app-rechercher-par-titre',
  templateUrl: './rechercher-par-titre.component.html',
  styles: ``
})
export class RechercherParTitreComponent {
  chansons! : Chanson[];
  titreChanson!: string;
  Albums! : Album[];
  searchTerm!:string;
  allChansons!:Chanson [];
  constructor(private chansonService: ChansonService) {}
  ngOnInit(): void {
    this.chansonService.listeChansons().subscribe(prods => {
    console.log(prods);
    this.chansons = prods;
    });
    }
    
  rechercherChans(){
    this.chansonService.rechercherParTitre(this.titreChanson).
    subscribe(prods => {
    this.chansons = prods;
    console.log(prods)});
    }

    onKeyUp(filterText : string){
      this.chansons = this.allChansons.filter(item =>
      item.titreChanson?.toLowerCase().includes(filterText));
      }
      
  
}
