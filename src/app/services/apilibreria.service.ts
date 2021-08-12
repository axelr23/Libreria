import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorLibro } from '../models/autor';
import { DialogListaComponent } from '../lista/dialog/dialoglista.component';
import { MatDialog } from '@angular/material/dialog';

const httpOption = {
  headers: new HttpHeaders({
    'Contend-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApilibreriaService {
  url: string = 'https://localhost:44329/api/autorlibros';
  constructor(
    private _http: HttpClient
  ) { }

  getLibreria(): Observable<AutorLibro>{
    return this._http.get<AutorLibro>(this.url);
  }

  add(autor: AutorLibro): Observable<Response>{
    return this._http.post<Response>(this.url, autor, httpOption);
  }
}
