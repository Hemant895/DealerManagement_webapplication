import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


     token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
     headers = new HttpHeaders({
      'Authorization': `Token ${this.token}`
    });

  

  getUserByEmail(email: any) {
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
    const headers = new HttpHeaders({
     'Authorization': `Token ${token}`
   });
    const url = 'https://pv.greatfuturetechno.com/pv-api/dealer/';
    return this.http
      .get(url,{headers})
      .pipe(map((users:any) => users.find((user:any) => user.email === email)));
  }

  getDealerList() {
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
    const headers = new HttpHeaders({
     'Authorization': `Token ${token}`
   });

    // Make the HTTP GET request with headers
    return this.http.get("https://pv.greatfuturetechno.com/pv-api/dealer/", {headers});
  }

  addDealer(Dealer: any){
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
    const headers = new HttpHeaders({
     'Authorization': `Token ${token}`
   });
    return this.http.post('https://pv.greatfuturetechno.com/pv-api/dealer/', Dealer,{headers});
  }

  updateDealer(Dealer: any,id:any) {
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
    const headers = new HttpHeaders({
     'Authorization': `Token ${token}`
   });
    return this.http.put(`${'https://pv.greatfuturetechno.com/pv-api/dealer/?id='}${id}`, Dealer,{headers});
  }

  deleteDealer(id: string) {
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
    const headers = new HttpHeaders({
     'Authorization': `Token ${token}`
   });
    return this.http.delete(`${'https://pv.greatfuturetechno.com/pv-api/dealer/?id='}${id}`,{headers});
  }

  getById(id: string) {
    const token = 'aa4d0b1b9b2794090b18febbd71cf2c90e0d5a83'
    const headers = new HttpHeaders({
     'Authorization': `Token ${token}`
   });
    return this.http.get(`${'https://pv.greatfuturetechno.com/pv-api/dealer/?id='}${id}`,{headers});
}
}
