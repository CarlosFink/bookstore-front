import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<Categoria[]> {
    const url = `${environment.baseUrl}/categorias`
    return this.http.get<Categoria[]>(url).pipe(take(1));
  }
}
