import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private addressSource=new BehaviorSubject(new Address());
  currentAddress=this.addressSource.asObservable();

  constructor() { }

  changeAddress(address:Address)
  {
    this.addressSource.next(address);
  }
}
