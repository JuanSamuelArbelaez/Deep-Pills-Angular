import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {
  private baseUrl= environment.apiBaseUrl

  constructor(private http: HttpClient) { }
  requestPasswordRecovery(email: string): Observable<any> {
    const url = `${this.baseUrl}/password-recovery/${email}`;
    return this.http.put(url, null);
  }
}
