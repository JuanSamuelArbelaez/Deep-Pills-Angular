import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../models/model-dto';

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  private apiUrl = environment.apiBaseUrl + '/enums';

  constructor(private http: HttpClient) {}

  getEnumValues(enumName: string): Observable<ResponseDTO> {
    const url = `${this.apiUrl}/get/${enumName}`;
    return this.http.get<ResponseDTO>(url);
  }
}
