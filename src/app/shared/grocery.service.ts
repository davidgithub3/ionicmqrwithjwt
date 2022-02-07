import { Injectable } from '@angular/core';
import { Grocery } from './grocery';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class GroceryService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addGrocery(Grocery: Grocery): Observable<any> {
    return this.http.post<Grocery>('http://localhost:3000/api/create-Grocery', Grocery, this.httpOptions)
      .pipe(
        catchError(this.handleError<Grocery>('Add Grocery'))
      );
  }

  getGrocery(id): Observable<Grocery[]> {
    return this.http.get<Grocery[]>('http://localhost:3000/api/get-Grocery/' + id)
      .pipe(
        tap(_ => console.log(`Grocery fetched: ${id}`)),
        catchError(this.handleError<Grocery[]>(`Get Grocery id=${id}`))
      );
  }

  getGroceryList(): Observable<Grocery[]> {
    return this.http.get<Grocery[]>('http://localhost:3000/api')
      .pipe(
        tap(Grocerys => console.log('Grocerys fetched!')),
        catchError(this.handleError<Grocery[]>('Get Grocerys', []))
      );
  }

  updateGrocery(id, Grocery: Grocery): Observable<any> {
    return this.http.put('http://localhost:3000/api/update-Grocery/' + id, Grocery, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Grocery updated: ${id}`)),
        catchError(this.handleError<Grocery[]>('Update Grocery'))
      );
  }

  deleteGrocery(id): Observable<Grocery[]> {
    return this.http.delete<Grocery[]>('http://localhost:3000/api/delete-Grocery/' + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Grocery deleted: ${id}`)),
        catchError(this.handleError<Grocery[]>('Delete Grocery'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}