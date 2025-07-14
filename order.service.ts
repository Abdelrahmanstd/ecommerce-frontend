import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl="http://localhost:4000/api/orders"
  constructor(private http:HttpClient) { }

  create():Observable<any>{
    return this.http.post(this.baseUrl,{})
  }

  getMyOrders(): Observable<any>{
    return this.http.get(`${this.baseUrl}/myorders`)
  }

  getAll(): Observable<any>{
    return this.http.get(this.baseUrl)
  }

  updateStatus(id:string,status:string):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,{status})
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }
}
