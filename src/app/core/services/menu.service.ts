import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }
  // apiUrl:string = 'https://menu-creator-services.herokuapp.com/api'
  apiUrl:string = environment.apiUrl
  

  public getMenus(): Observable<any>{
  	return this.http.get(this.apiUrl+'/menu');
  }

  public viewMenu(id:string | null): Observable<any>{
  	return this.http.get(this.apiUrl+'/menu/'+id);
  }

  public createMenu(value:any): Observable<any>{
  	return this.http.post(this.apiUrl+'/menu',value);
  }

  public deleteMenu(id:string | null): Observable<any>{
    return this.http.delete(this.apiUrl+'/menu/'+id);
  }  

  public editMenu(value:any): Observable<any>{
    console.log(value._id);
    return this.http.patch(this.apiUrl+'/menu/'+value._id,value);
  }





}
