import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getUserByEmail(email: any) {
    const url = 'https://pv.greatfuturetechno.com/pv-api/dealer/';
    return this.http
      .get(url)
      .pipe(map((users:any) => users.find((user:any) => user.email === email)));
  }

  getDealerList() {
    // Make the HTTP GET request with headers
    return this.http.get("https://pv.greatfuturetechno.com/pv-api/dealer/");
  }

  addDealer(Dealer: any){
    return this.http.post('https://pv.greatfuturetechno.com/pv-api/dealer/', Dealer);
  }

  updateDealer(Dealer: any,id:any) {
    return this.http.put(`${'https://pv.greatfuturetechno.com/pv-api/dealer/?id='}${id}`, Dealer);
  }

  deleteDealer(id: string) {
    return this.http.delete(`${'https://pv.greatfuturetechno.com/pv-api/dealer/?id='}${id}`);
  }
}
