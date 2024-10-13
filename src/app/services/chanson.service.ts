import { Injectable } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { Album } from '../model/album.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { apiURL } from '../config';
import { AlbumWrapper } from '../model/AlbumWrapped';


const httpOptions = {
 
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
  

@Injectable({
  providedIn: 'root'
})
export class ChansonService {
 
  apiURLAlb: string = 'http://localhost:9090/chansons/album';
  chansons! : Chanson[]; 
  albums!: Album[];
  constructor(private http : HttpClient) {  
   /* this.albums = [ {idAlbum : 1, nomAlbum : "nom",proprietaireAlbum:"hey"},
      {idAlbum : 2, nomAlbum : "Imprimante",proprietaireAlbum:"hey"}]; 
     this.chansons = [
    {
      idChanson: 1, 
      nomChanson: "Song 1", 
      dureChanson: 300, 
      album:{idAlbum:11,nomAlbum:"hey",proprietaireAlbum:"emily"}
     
    },
    {
      idChanson: 2, 
      nomChanson: "Song 2", 
      dureChanson: 450, 
      album:{idAlbum:11,nomAlbum:"hey",proprietaireAlbum:"emily"}
      
    },
    {
      idChanson: 3, 
      nomChanson: "Song 3", 
      dureChanson: 210, 
      album:{idAlbum:11,nomAlbum:"hey",proprietaireAlbum:"emily"}
    
    }
  ];*/
  }

  listeChansons():Observable<Chanson[]> {
    return this.http.get<Chanson[]>(apiURL);
  }



  /*ajouterChanson( chans: Chanson){
  this.chansons.push(chans);
  }*/
  ajouterChanson( chans: Chanson):Observable<Chanson>{
    return this.http.post<Chanson>(apiURL, chans, httpOptions);
    }
    
  supprimerChanson(id:number){
   /* let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      const index = this.chansons.indexOf(chans, 0);
      if (index > -1) {
        this.chansons.splice(index, 1);
      }
    }*/
      const url = `${apiURL}/${id}`;
      return this.http.delete(url, httpOptions);
  }
  
  chanson! : Chanson;
  consulterChanson(id: number): Observable<Chanson> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Chanson>(url);
    }
    
trierChansons(){
  this.chansons = this.chansons.sort((n1,n2) => {
  if (n1.idChanson! > n2.idChanson!) {
  return 1;
  }
  if (n1.idChanson! < n2.idChanson!) {
  return -1;
  }
  return 0;
  });
  }
  
updateChanson(c: Chanson) {
 
/*  this.supprimerChanson(c);
  this.ajouterChanson(c);
  this.trierChansons();*/
  return this.http.put<Chanson>(apiURL, c, httpOptions);

}
listeAlbums():Observable<AlbumWrapper>{
  return this.http.get<AlbumWrapper>(this.apiURLAlb);
  }
  consulterAlbum(id:number): Album{
  return this.albums.find((album: { idAlbum: number; }) => album.idAlbum == id)!;
  }

  rechercherParAlbum(idAlbum: number):Observable< Chanson[]> {
    const url = `${apiURL}/chansalbu/${idAlbum}`;
    return this.http.get<Chanson[]>(url);
    }

    rechercherParTitre(titre: string):Observable< Chanson[]> {
      const url = `${apiURL}/chansByName/${titre}`;
      return this.http.get<Chanson[]>(url);
      }

      ajouterAlbum( alb: Album):Observable<Album>{
        return this.http.post<Album>(this.apiURLAlb, alb, httpOptions);
        }

}  