import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private baseUrl="http://localhost:4000/api/subcategory" 
  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get(this.baseUrl)
  }

  create(data:{name:string,category:string}):Observable<any>{
    return this.http.post(this.baseUrl,data)
  }

   update(id: string, data: { name: string; category: string }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
