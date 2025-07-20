import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ParentService } from '../../../core/services/parent.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends ParentService{


  uriLogin: string = "login";
  uriLogout : string =  "logout";


  isAuthenticate(): boolean {
    return localStorage.getItem(environment.appName + "_token") != null;
  }

  getToken(): string {
    if (this.isAuthenticate()) {

      return localStorage.getItem(environment.appName + "_token")!
    }
    return "";
  }

  getUser():any {
    return JSON.parse(localStorage.getItem(environment.appName + "_user")!) ;
  }

  updateUserInLocalStorage(user: any): void {
      localStorage.setItem(environment.appName + "_user", JSON.stringify(user));
  }

  getUserRole():string {
    const user = localStorage.getItem(environment.appName + '_role') as string;
    return user ;
  }

  getDefaultRouteForRole(role: string): string {
    switch(role) {
      case 'admin': return '/admin/etudiant';
      case 'US': return '/formateur/formations';
      case 'apprenant': return '/apprenant/dashboard';
      default: return '/auth/login';
    }
  }

   register(userData: any): Observable<any> {
    return this.postData('authUser/register', userData);
  }

}
