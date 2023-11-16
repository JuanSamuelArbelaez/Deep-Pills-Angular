import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as dtos from '../models/model-dto'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) { }
  
  register(registerPatientDTO: dtos.RegisterPatientDTO): Observable<any> {
    const url = `${this.baseUrl}/registration/register-patient`;
    return this.http.put(url, registerPatientDTO);
  }
}
