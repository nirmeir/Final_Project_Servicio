import { Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Restaurant, RestaurantService, Table } from '../shared/services/restaurant.service';  // Restaurant, RestaurantService
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-manager-panel',
  templateUrl: './manager-panel.component.html',
  styleUrls: ['./manager-panel.component.css']
})
export class PanelManagerComponent implements OnInit {
  allPokemons$: Observable<Restaurant[]> | undefined;
  allPokemon$: Observable<Restaurant> | undefined;

  username: any;
  constructor(public userService: UserService, public restaurantService: RestaurantService) { }

  ngOnInit()  {

    // const restaurant: Restaurant = { res_name: 'res_name', restaurant_name: 'restaurant_name',restaurant_address:'restaurant_address', };
    // let sts=this.restaurantService.AddRestaurant(restaurant);

    // const tbl: Table = { restaurant_id: '4kkWRim7TbdOYUyBdnDf', table_id: '5',is_call:true,call_type:'',call_time:'', };
    // let sts=this.restaurantService.AddTable(tbl);

      let user=localStorage.getItem('user')
    if(user)
      console.log(user)
      let user_json= JSON.parse(localStorage.getItem('user')!);
      let uid=user_json['uid']
      this.restaurantService.GetUserToRestaurant(uid)
      this.restaurantService.GetTables('4kkWRim7TbdOYUyBdnDf')


      // let ps = this.restaurantService.get('lCuLvaHdt72h8nzlNn9z').subscribe(val => console.log(val));
      // this.restaurantService.().pipe(filter((val: any) => val['user_id'] == uid)).subscribe(val => console.log(val));
}

}
