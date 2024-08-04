import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService, Table } from '../shared/services/restaurant.service';
import { QueryDocumentSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-restaurantgusts-landing',
  templateUrl: './restaurantgusts-landing.component.html',
  styleUrls: ['./restaurantgusts-landing.component.css']
})
export class RestaurantgustsLandingComponent implements OnInit {
  private token: any;

  constructor(public router: Router, private res_service: RestaurantService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      await this.res_service.ValidRestorantAndTable(params['restaurant_id'], params['table_id']).get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
        this.token = this.SetOTK()
        this.res_service.SetOTK(this.token, (ss.docs[0] as QueryDocumentSnapshot<Table>).id)
        this.router.navigateByUrl('/restaurantgusts/' + this.token);
      }
      )
    }
    )
  }

  SetOTK(): string {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    const lengthOfCode = 40;
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    localStorage.setItem('OTK', text)
    return text;
  }
}


