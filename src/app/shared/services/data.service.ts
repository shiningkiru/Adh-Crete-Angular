import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

@Injectable()
export class DataService {
  apiUrl:String =environment.apiUrl;
  token= { headers: new HttpHeaders({'Authorization': 'Bearer ' + AuthService.getToken()})}
  constructor(public http: HttpClient, public url) { }

  get(){
    return this.http.get(this.apiUrl+this.url,this.token);
  }

  create(formData){
    return this.http.post(this.apiUrl+this.url, formData ,this.token);
  }

  update(id,formData){
    return this.http.put(this.apiUrl+this.url+"/"+id, formData,this.token);
  }
  
  delete(id){
    return this.http.delete(this.apiUrl+this.url+"/"+id,this.token);
  }
  
  getBy(id){
    return this.http.get(this.apiUrl+this.url+"/"+id,this.token);
  }

  getByURL(url){
    return this.http.get(this.apiUrl+url,this.token);
  }

  postByURL(url,formData={}){
    return this.http.post(this.apiUrl+url, formData ,this.token);
  }
  
  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
      const formData = form || new FormData();
      for (let property in object) {
          if (!object.hasOwnProperty(property) || !object[property]) {
            continue;
          }
          const formKey = namespace ? `${namespace}[${property}]` : property;
          if (object[property] instanceof Date) {
            formData.append(formKey, object[property].toISOString());
          } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
            this.createFormData(object[property], formData, formKey);
          } else {
            formData.append(formKey, object[property]);
          }
      }
      return formData;
  }

  // Dummy Rest API
  // change this function name
  // dailyForecast() {
  //   return this.http.get(this.apiUrl+'task/chart',this.token).pipe(map(result => result));
  // }

  
  formatDate(date, f='y') {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if(f == 'y')
      return [year, month, day].join('-');
    else
      return [month, day, year].join('-');
  }

  convertObjectToArray(data={}){
    
    var res = Object.keys(data).map(elem => {
      return data[elem];
    });
    return res;
  }

}
