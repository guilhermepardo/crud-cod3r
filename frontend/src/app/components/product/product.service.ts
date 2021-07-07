import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from'@angular/material/snack-bar'
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL: string = 'http://localhost:3001/products'

  constructor(
    private snackBar: MatSnackBar, 
    private http: HttpClient
    ) { }

  showMessage(msg: string, isError = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    })
  }

  errorHandler(e : any) : Observable<any> {
    this.showMessage("Ocorreu um erro :/", true) 
    return EMPTY
  }

  post(product: Product): Observable<Product> {
    return this.http.post<Product>(this.BASE_URL, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  getById(id : string) : Observable<Product> {
    const uri = `${this.BASE_URL}/${id}`
    return this.http.get<Product>(uri)
  }

  put(product : Product) : Observable<Product> {
    const uri = `${this.BASE_URL}/${product.id}`
    return this.http.put<Product>(uri, product)
  }

  delete(product: Product) : Observable<Product> {
    const uri = `${this.BASE_URL}/${product.id}`
    return this.http.delete<Product>(uri)
  }
   
}
