import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as express from 'express';

import { map } from 'rxjs/operators';
// import { app } from 'functions/src';
// import * as functions from "firebase-functions";




@Injectable({
  providedIn: 'root'
})
export class ApiService {

// export const app = express();
// exports.app = functions.https.onRequest(app);

 
  constructor(private _http: HttpClient) { }
  //Now here i will define POST,GET,PUT,DELETE
  //Create Restaurant profile , Using Post Method

// testGetAll(){ // usercomponent - 0 
//   // const {firestore} = getFirebase();
// }


// postRestaurant2(data: any) {
//   return app.post("https://servicio-system-default-rtdb.firebaseio.com/users", data)
// }

postRestaurant(data: any) {
    return this._http.post<any>("https://servicio-system-default-rtdb.firebaseio.com/users", data).pipe(map((res: any) => {
      return res;
    }))
  }
// Get restaurant data using Get Method
getRestaurant(){
  return this._http.get<any>("https://servicio-system-default-rtdb.firebaseio.com/users").pipe(map((res:any)=>{
  return res;
  }))
}
//Update Restaurant using PUT method
updateRestaurant(data:any,id:number){
  return this._http.put<any>("https://servicio-system-default-rtdb.firebaseio.com/users/"+id,data).pipe(map((res:any)=>{
  return res;
  }))
}
//Delete Restaurant using Delete Method
deleteRestaurant(id:number){
  return this._http.delete<any>("https://servicio-system-default-rtdb.firebaseio.com/users/"+id).pipe(map((res:any)=>{
  return res;
  }))
}

updateCalls(data:any, name:string){
  // console.log(`test it ${name} --- ${data}`)
  
  
  return this._http.put<any>("https://servicio-system-default-rtdb.firebaseio.com/usercomponent/"+name,data).pipe(map((res:any)=>{
  // console.log("test we finished")
  return res;
  }))
}
}
