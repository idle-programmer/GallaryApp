import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { response } from 'express';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient,) { }
  api_url: string = 'http://127.0.0.1:8000/';
  signUp(username: string,email:string, password: string) {
    return this.http.post<any>(this.api_url + 'register/',
      { username,email,password }, httpOptions).pipe(
        map(user => {
          return user;
        })
      )
  }

  logIn(username: string, password: string) {
    return this.http.post<any>(this.api_url + 'login/',
      { username,password }, httpOptions).pipe(
        map(user => {
          return user;
        })
      )
  }

  logout(data:any){
    return this.http.post<any>(this.api_url+'logout/',data,httpOptions).pipe(map(data=>{
      return sessionStorage.clear()
    }))
  }

  public upload(formData: any) {
    return this.http.post<any>(`${this.api_url}/media/`, formData);
  }

  public getMedia(){
    return this.http.get(this.api_url + '/media/');
  }

  public deleteMedia(mediaId:any){
    return this.http.delete<any>(this.api_url+'del/media/'+String(mediaId))
  }
}
