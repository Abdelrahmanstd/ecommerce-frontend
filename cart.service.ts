import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  private baseUrl="http://localhost:4000/api/cart"

  getCart():Observable<any>{
    return this.http.get(this.baseUrl)
  }
  
  addToCart(data:{productId:string,quantity:number}):Observable<any>{
    return this.http.post(this.baseUrl,data)
  }

  updateItem(data:{productId:string,quantity:number}):Observable<any>{
    return this.http.put(this.baseUrl,data)
  }

  removeItem(productId:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${productId}`)
  }
}
