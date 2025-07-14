import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl="http://localhost:4000/api/product"
  constructor(private http:HttpClient) { }

  getAll(): Observable<any>{
    return this.http.get(this.baseUrl)
  }

  create(data:FormData):Observable<any>{
    return this.http.post(this.baseUrl,data)
  }

  update(id:string,data:FormData):Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,data)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  getById(id: string): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}
}
