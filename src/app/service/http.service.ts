import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = "http://localhost:8081/";

  constructor(private http:HttpClient) { }

  addAddress(body:any):Observable<any>
  {
    return this.http.post(this.baseUrl+"insert",body);
  }

  getAddressData():Observable<any>
  {
    return this.http.get(this.baseUrl);
  }

  deleteAddressData(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + `${id}`,{responseType:'text'});
  }

 getAddressById(id : number): Observable<any> {
    return this.http.get(this.baseUrl + `${id}`);
  }

  updateEmployeData(id: number, body: any): Observable<any> {
    console.log(body)
    return this.http.put(this.baseUrl + `${id}`, body);
  }
}
