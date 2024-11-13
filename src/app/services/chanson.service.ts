
import { Injectable } from '@angular/core';
import { Chanson } from '../model/chanson.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { apiURL } from '../config';


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

 

  constructor(private http: HttpClient) {}

  listeChansons(): Observable<Chanson[]> {
  
    return this.http.get<Chanson[]>(this.apiURL + "/all");
  }

}