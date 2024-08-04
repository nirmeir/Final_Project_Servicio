
import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { docSnapshots } from '@angular/fire/firestore';
import { analytics } from 'firebase-functions/v1';
import firebase from 'firebase/compat';
import { doc } from 'firebase/firestore';
import { map, Observable } from 'rxjs';

export interface Restaurant {
  $key?: string;
  logo: string
  res_name: string;
  restaurant_address: string;
  restaurant_name: string;
}

export interface Table {
  $key?: string;
  restaurant_id: string;
  table_id: string;
  is_call: boolean;
  call_type: string;
  call_time: string;
  OTK: string;
}

export interface UserToRestaurant {
  $key?: string;
  restorant_id: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  list!: AngularFireList<any>;
  bookRef!: AngularFireObject<any>;
  res: Restaurant[] = []
  logo_src: string = ''

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) { }

  AddRestaurant(restaurant: Restaurant) {
    let res_name = restaurant.res_name
    let restaurant_address = restaurant.restaurant_address
    let restaurant_name = restaurant.restaurant_name
    this.firestore.collection('restaurants').add({
      res_name, restaurant_address, restaurant_name,
    })
      .then(res => {
        return res.id;
      })
      .catch(e => {
        console.log(e);
      })
  }

  AddTable(table: Table) {
    let table_id = table.table_id
    let restaurant_id = table.restaurant_id
    let is_call = table.is_call
    let call_type = table.call_type
    let call_time = table.call_time

    this.firestore.collection('tables').add({
      table_id, restaurant_id, is_call, call_type, call_time
    })
      .then(tbl => {
        return tbl.id;
      })
      .catch(e => {
        console.log(e);
      })
  }


  GetRestorants(rest_id: string) {
    let all_docs: firebase.firestore.QueryDocumentSnapshot<unknown>[] = []
    return this.firestore.collection('restaurants', ref => ref.where("res_name", "==", rest_id)).get()
  }

  GetUserToRestaurant(user_id: string) {
    var all_docs: string[] = [];

    this.firestore.collection('userToRestaurant', ref => ref.where("user_id", "==", user_id)).get()
      .subscribe(ss => {
        if (ss.docs.length === 0) {
          return null
        } else {
          ss.docs.forEach(doc => all_docs.push(JSON.stringify(doc.data())))
        }
        return all_docs
      })
  }

  async Update_total_call(res_id: string) {
    // console.log("res_id", res_id)
    // let resRef = this.firestore2.collection("restaurants").doc(res_id);
    let resRef = this.firestore.collection("restaurants").doc(res_id);

    resRef.get().subscribe(doc => {
      if (doc.exists) {
        let fieldValue = doc.get("total_call");
        this.firestore.collection("restaurants").doc(res_id).update({ total_call: fieldValue + 1 });
        // console.log("this is", fieldValue);
      } else {
        console.log("No such document!");
      }
    });


  }

  ValidRestorantAndTable(restaurant_id: string, table_id: string): any {
    console.log("reference_valid", this.firestore.collection('tables', ref => ref.where("restaurant_id", "==", restaurant_id).where("table_id", "==", table_id)))
    return this.firestore.collection('tables', ref => ref.where("restaurant_id", "==", restaurant_id).where("table_id", "==", table_id))
  }
  ValidToken(token: string): any {
    return this.firestore.collection('tables', ref => ref.where("OTK", "==", token))
  }

  SetOTK(OTK: string, tables_id: string = ''): any {
    this.firestore.doc('/tables/' + tables_id).update({ OTK: OTK })
  }

  CallService(tables_id: string = '', res_id: string): any {
    this.Update_total_call(res_id)
    if (tables_id != '') {
      let time = new Date()
      this.firestore.doc('/tables/' + tables_id).update({ is_call: true, call_time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(), call_type: "שירות" })
    }
  }
  CallBill(tables_id: string = '', res_id: string): any {
    this.Update_total_call(res_id)
    if (tables_id != '') {
      let time = new Date()
      this.firestore.doc('/tables/' + tables_id).update({ is_call: true, call_time: time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds(), call_type: "חשבון" })
      // this.SetOTK(tables_id)
    }

  }

  Updatecall(tables_id: string = ''): any {
    if (tables_id != '') {
      this.firestore.doc('/tables/' + tables_id).update({ is_call: false })
    }
  }

  GetTables(restaurant_id: string): any {
    return this.firestore.collection('tables', ref => ref.where("restaurant_id", "==", restaurant_id).where("is_call", "==", true).limit(4))
  }


  async Get_logo(res_id: string): Promise<any> {

    let resRef = this.firestore.collection("restaurants").doc(res_id);

    return (async (): Promise<any> => {
      try {
        const doc = await resRef.get().toPromise();
        if (doc?.exists) {
          let fieldValue = await doc.get("logo");
          this.logo_src = fieldValue
          return this.logo_src
    
        } else {
          console.log("No such document!");
          return null
        }
    
      }
      catch (e) {
        return e
      }
    })();
    
  }





  get_menu(): any {

    // console.log("reference", this.firestore.collection('restaurants'))

    return this.firestore.collection('restaurants')

  }


}



