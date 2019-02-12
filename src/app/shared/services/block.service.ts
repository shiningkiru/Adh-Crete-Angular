import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlockService  extends DataService {

  constructor(public http:HttpClient) { 
    super(http,'block')
  }
}
