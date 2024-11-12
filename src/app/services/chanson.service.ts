import { Image } from './../model/image.model';
import { Injectable } from '@angular/core';
import { Chanson } from '../model/chanson.model';
import { Album } from '../model/album.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { apiURL } from '../config';
import { AlbumWrapper } from '../model/AlbumWrapped';
import { AuthService } from './auth.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ChansonService {
  apiURL: string = 'http://localhost:9090/chansons/api';
  apiURLAlb: string = 'http://localhost:9090/chansons/album';
  chansons!: Chanson[];
  albums!: Album[];
 

  constructor(private http: HttpClient, private authService: AuthService) {}

  listeChansons(): Observable<Chanson[]> {
  
    return this.http.get<Chanson[]>(this.apiURL + "/all");
  }

  ajouterChanson(chans: Chanson): Observable<Chanson> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Chanson>(this.apiURL + "/addchan", chans, { headers: httpHeaders });
  }

  supprimerChanson(id: number) {
    const url = `${this.apiURL}/delchan/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterChanson(id: number): Observable<Chanson> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Chanson>(url, { headers: httpHeaders });
  }

  trierChansons() {
    this.chansons = this.chansons.sort((n1, n2) => {
      if (n1.idChanson! > n2.idChanson!) {
        return 1;
      }
      if (n1.idChanson! < n2.idChanson!) {
        return -1;
      }
      return 0;
    });
  }

  updateChanson(c: Chanson): Observable<Chanson> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Chanson>(this.apiURL + "/updatechan", c, { headers: httpHeaders });
  }

  listeAlbums(): Observable<AlbumWrapper> {
 
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<AlbumWrapper>(this.apiURLAlb,{headers:httpHeaders});
  }

  consulterAlbum(id: number): Album {
    return this.albums.find((album: { idAlbum: number; }) => album.idAlbum == id)!;
  }

  rechercherParAlbum(idAlbum: number): Observable<Chanson[]> {
    const url = `${this.apiURL}/chansalbu/${idAlbum}`;
    return this.http.get<Chanson[]>(url);
  }

  rechercherParTitre(titre: string): Observable<Chanson[]> {
    const url = `${this.apiURL}/chansByName/${titre}`;
    return this.http.get<Chanson[]>(url);
  }

  ajouterAlbum(alb: Album): Observable<Album> {
    return this.http.post<Album>(this.apiURLAlb, alb, httpOptions);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
    }
    loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
    }

     uploadImageChanson(file: File, filename: string, idChan:number): Observable<any>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/uploadImageChan'}/${idChan}`;
      return this.http.post(url, imageFormData);
      } 
      supprimerImage(id : number) {
        const url = `${this.apiURL}/image/delete/${id}`;
        return this.http.delete(url, httpOptions);
        }
      

      uploadImageFS(file: File, filename: string, idChanson : number): Observable<any>{
        const imageFormData = new FormData();
        imageFormData.append('image', file, filename);
        const url = `${apiURL + '/image/uploadFS'}/${idChanson}`;
        return this.http.post(url, imageFormData);
      }

     
}
