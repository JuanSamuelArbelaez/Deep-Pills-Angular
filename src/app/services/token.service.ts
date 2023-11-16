import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { HttpClientModule } from '@angular/common/http';

const TOKEN_KEY = "AuthToken";

@Injectable({
providedIn: 'root'
})
export class TokenService {
  constructor(private router: Router) { }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      console.log('Logged: '+true);
      return true;
    }
    console.log('Logged: '+false)
    return false;
  }

  public login(token: string) {
    const decoded = this.decodePayload(token);
    console.log('Token Values: ', decoded);
    return decoded;
  }


  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/log-in"]);
  }

  private decodePayload(token: string): any {
    console.log('Token value:', token);
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = this.decodePayload(token);
      return payload.id || null;  // Devuelve null si payload.id no está definido
    }
    return null;
  }
}
