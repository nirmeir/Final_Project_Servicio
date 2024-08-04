import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, DocumentChangeAction} from '@angular/fire/compat/firestore';
import { database, firestore } from 'firebase-admin';
import { doc, DocumentChange } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { RestaurantService, Table } from '../shared/services/restaurant.service';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface Restaurant {
  $key?: string;
  logo:string
  res_name: string;
  restaurant_address: string;
  restaurant_name: string;
  total_call: number;
}

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  
  private total_call=0;
  tables: Table[] = []
  call_tables: string[] = []
  private id: any;
  private restaurant: any;
  constructor(private res_service: RestaurantService, private firestore2: AngularFirestore, private route: ActivatedRoute) {
  }
  
  ngOnInit(): any {
   

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.restaurant = params['restaurant_id'];
    })
    
    this.res_service.GetTables(this.restaurant).snapshotChanges().subscribe((data: any[]) => {
      this.res_service.GetTables(this.restaurant).get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
        this.tables = []
        ss.docs.forEach((doc: { data: () => Table; }) => this.tables.push(doc.data() as Table))
        if (data) {
          data.map(test => {
            if (test.payload.doc.data().is_call == true) {
              let diff = this.tables.filter(x => !this.call_tables.includes(x.table_id))

              if (diff.length > 0) {

                // this.Update_total_call(diff[0].restaurant_id)

                // console.log("diff",diff)

                this.audio_call()
                
                this.off_call(diff[0].restaurant_id,diff[0].table_id)


                // console.log("this.call_tables",this.call_tables)

                // console.log("res_id",diff[0].restaurant_id)
                // console.log("tab_id",diff[0].table_id)
              
            }
            
            }
            this.call_tables = this.tables.map(x => x.table_id)
          })
         
        }
      })
    })
  }
  //create function that add +1 to the total_call field in the restaurant collection
  // async Update_total_call(res_id: string) {
  // console.log("res_id",res_id)
  // // let resRef = this.firestore2.collection("restaurants").doc(res_id);
  // let resRef = this.firestore2.collection("restaurants").doc(res_id);

  // resRef.get().subscribe(doc => {
  //     if (doc.exists) {
  //         let fieldValue = doc.get("total_call");
  //         this.firestore2.collection("restaurants").doc(res_id).update({ total_call:fieldValue+1 });
  //         console.log("this is",fieldValue);
  //     } else {
  //         console.log("No such document!");
  //     }
  // });


  // }
   

  

  //   this.res_service.GetTables("4kkWRim7TbdOYUyBdnDf").get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
  //   this.tables=[]
  //   ss.docs.forEach((doc: { data: () => Table; }) => this.tables.push( doc.data() as Table))
  //   let diff=this.tables.filter(x => !this.prev_tables.includes(x))
  //   diff=diff.filter(x => x.is_call==true)
  //   if (diff.length>0)  { 
  //       this.audio_call()
  //   }
  //   this.prev_tables=this.tables
  //   })
  // })

async off_call(res_id: string, table_id: string){
  await this.sleep(40000)
  
  // console.log("im wait for timeout - table",table_id)
   this.Update_call(res_id,table_id)
}

   sleep(ms:number){
   return new Promise((resolve) => setTimeout(resolve, ms));
}


   async Update_call(res_id: string, table_id: string) {
      // console.log("getting inside update_call",table_id)
      await this.res_service.ValidRestorantAndTable(res_id, table_id).get().subscribe(async (ss: { docs: { data: () => Table; }[]; }) => {
      await this.res_service.Updatecall((ss.docs[0] as QueryDocumentSnapshot<Table>).id)

      // console.log( "this is the test",this.res_service.ValidRestorantAndTable(res_id, table_id))
      // console.log("table1", ((ss.docs[0] as QueryDocumentSnapshot<Table>).id))
    })
  }


  audio_call() {
    const audio = new Audio();
    audio.src = "https://firebasestorage.googleapis.com/v0/b/servicio-system.appspot.com/o/monitor.mp3?alt=media&token=5271873e-b14d-4939-b362-2ed1d606b4a4";
    audio.load();
    audio.play();

  }
}




