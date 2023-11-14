import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnumsService {
  private apiUrl = environment.apiBaseUrl + '/enums';

  constructor(private http: HttpClient) {}

  getEnumValues(enumName: string): Observable<string[]> {
    const url = `${this.apiUrl}/get/${enumName}`;
    return this.http.get<string[]>(url);
  }
}
