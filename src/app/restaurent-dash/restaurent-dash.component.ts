import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';


@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurantModelObj: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!: boolean
  showbtn!:boolean
 
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }


  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
      nickname: [''],
      password: ['']

    })
    this.getAllData()
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

  //now Subscribing our data which is maped via sevices
  addRestaurant() {
    
    this.restaurantModelObj.name = this.formValue.value.name
    this.restaurantModelObj.email = this.formValue.value.email
    this.restaurantModelObj.mobile = this.formValue.value.mobile
    this.restaurantModelObj.address = this.formValue.value.address
    this.restaurantModelObj.services = this.formValue.value.services
    this.restaurantModelObj.nickname = this.formValue.value.nickname
    this.restaurantModelObj.password = this.formValue.value.password

    this.api.postRestaurant(this.restaurantModelObj).subscribe(res => {
      console.log(res);
      alert("המסעדה נוספה בהצלחה")
      //clear fill from dara
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset
      this.getAllData();
    },
      err => {
        alert("אנא וודא שהזנת פרטים נכונים")
      }
    )
  }
  //get all Data
  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;

    })
  }
  //delete records
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("המסעדה הוסרה בהצלחה")
      this.getAllData();//quick refresh

    })

  }
  editResto(data:any){
    this.showAdd=false;
    this.showbtn=true;

    this.restaurantModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.service);
    this.formValue.controls['nickname'].setValue(data.nickname);
    this.formValue.controls['password'].setValue(data.password);
  }

  updateResto(){

    this.restaurantModelObj.name = this.formValue.value.name
    this.restaurantModelObj.email = this.formValue.value.email
    this.restaurantModelObj.mobile = this.formValue.value.mobile
    this.restaurantModelObj.address = this.formValue.value.address
    this.restaurantModelObj.services = this.formValue.value.services
    this.restaurantModelObj.nickname = this.formValue.value.nickname
    this.restaurantModelObj.password = this.formValue.value.password

    this.api.updateRestaurant(this.restaurantModelObj,this.restaurantModelObj.id).subscribe(res=>{
      alert("השינויים נשמרו בהצלחה")
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset
      this.getAllData();
    })
  }


}





