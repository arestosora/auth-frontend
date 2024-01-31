import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../app.settings';
import { UserLogin, UserRegister } from '../interfaces/user.interface';
import { Response } from '../interfaces/response.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly Endpoint: string = Config.API_URL
  private constructor(private http: HttpClient, private router: Router) { }

  public register(user: UserRegister): Observable<Response> {
    return this.http.post<Response>(`${this.Endpoint}/auth/register`, user)
  }

  public login(user: UserLogin): Observable<Response> {
    return this.http.post<Response>(`${this.Endpoint}/auth/login`, user)
  }

  public storeToken(token: string) {
    localStorage.setItem('token', token)
  }

  public getToken() {
    return localStorage.getItem('token')
  }

  public isLogged(): boolean {
    return !!localStorage.getItem('token')
  }

  public logOut() {
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
