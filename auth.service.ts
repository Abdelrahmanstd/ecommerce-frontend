import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl="http://localhost:4000/api/user"
  constructor(private http:HttpClient,private router:Router) { }

  login(credential:{email:string,password:string}){
    return this.http.post(`${this.baseUrl}/login`,credential)
  }

  signup(data:{name:string,email:string,password:string}){
    return this.http.post(`${this.baseUrl}/register`,data)
  }

  saveToken(token:string){
    localStorage.setItem('token',token)
  }

  getToken():string|null{
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
    
    this.router.navigate(['/auth/login'])
  }

  isLoggedIn():boolean{
    return !!this.getToken()
  }

  getUserRole():string|null{
    const token=this.getToken()
    if(!token) return null

    try {
      
      const payload=JSON.parse(atob(token.split('.')[1]))
      return payload.role

    } catch {
      return null
    }
  }
  

  currentUserId():string | null{
    const token=this.getToken()
    
    if(!token) return null

     try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId || payload._id; 
    } catch {
      return null;
    }
  }
}
