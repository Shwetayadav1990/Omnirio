import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
export interface PeriodicElement {
  name: string;
  sex: string;
  city: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Test1', sex: 'male', city: 'PuneH'},
  {name: 'Test2', sex: 'female', city: 'Mumbai'},
  {name: 'Test3', sex: 'male', city: 'Delhi'}
];

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data = new BehaviorSubject<any>(ELEMENT_DATA);
  constructor() { }

  // tslint:disable-next-line: typedef
  public getData(){
   return  this.data.asObservable();
  }

  public addData(node){
    ELEMENT_DATA.push(node);
    this.data.next(ELEMENT_DATA);
  }

  updateData(data:any, idx:any){
    ELEMENT_DATA[idx] = data;
    this.data.next(ELEMENT_DATA);
  }

  deleteData(idx:number){
    ELEMENT_DATA.splice(idx, 1);
    this.data.next(ELEMENT_DATA);
  }


}
