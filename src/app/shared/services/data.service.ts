
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

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

  postByURL(url, data){
    return this.http.post(this.apiUrl+url, data,this.token);
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
  

}
