import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { Categoria } from './categoria.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar
  ) {}

  findAll(): Observable<Categoria[]> {
    const url = `${environment.baseUrl}/categorias`
    return this.http.get<Categoria[]>(url).pipe(take(1))
  }

  findById(id: String): Observable<Categoria>  {
    const url = `${environment.baseUrl}/categorias/${id}`
    return this.http.get<Categoria>(url).pipe(take(1))
  } 

  create(categoria: Categoria): Observable<Categoria> {
    const url = `${environment.baseUrl}/categorias`
    return this.http.post<Categoria>(url, categoria).pipe(take(1))
  }

  update(categoria: Categoria): Observable<void> {
    const url = `${environment.baseUrl}/categorias/${categoria.id}`
    return this.http.patch<void>(url, categoria).pipe(take(1))
  }

  delete(id: String): Observable<void> {
    const url = `${environment.baseUrl}/categorias/${id}`
    return this.http.delete<void>(url).pipe(take(1))
  }

  message(msg: string): void {
    this.snack.open(msg, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
