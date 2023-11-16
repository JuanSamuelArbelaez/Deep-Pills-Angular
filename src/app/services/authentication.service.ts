import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../models/model-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.apiBaseUrl
  constructor(private http: HttpClient) { }
  
  login(email: string, password: string): Observable<ResponseDTO> {
    const loginData = { email, password };
    const url = `${this.baseUrl}/auth/login`;
    return this.http.request<ResponseDTO>("post", url, { body: loginData }  );
  }
}
