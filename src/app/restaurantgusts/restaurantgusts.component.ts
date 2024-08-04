import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { HttpClient } from '@angular/common/http';
import { last, map } from 'rxjs/operators';
import { userComponent } from './userComponent';
import { RestaurantService, Table } from '../shared/services/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { doc, Query, QueryConstraint, QueryConstraintType, QueryDocumentSnapshot } from 'firebase/firestore';
import { NgTinyUrlService } from 'ng-tiny-url';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { database, firestore } from 'firebase-admin';
import { TranslateService } from '@ngx-translate/core';



const FULL_DASH_ARRAY: number = 283;
const WARNING_THRESHOLD: number = 10;
const ALERT_THRESHOLD: number = 5;


interface ICOLORS {
  info: ICOLOR_CODE,
  warning: ICOLOR_CODE,
  alert: ICOLOR_CODE
}

interface ICOLOR_CODE {
  color: string;
  threshold?: number;
}

const COLOR_CODES: ICOLORS = {

  info: {
    color: "green",

  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD,
  },
}
export interface Restaurant {
  $key?: string;
  logo: string
  menu: string
  res_name: string;
  res_id: string
  restaurant_address: string;
  restaurant_name: string;
}

export interface Table_id {
  $key?: string;
  exists: string;
  id: string;
  metadata: string;
  ref: string;

}

let TIME_LIMIT: number = 45; let timePassed = 0;
let timerInterval;
let remainingPathColor = COLOR_CODES.info.color;

@Component({
  selector: 'app-restaurantgusts',
  templateUrl: 'restaurantgusts.component.html',
  styleUrls: ['./restaurantgusts.component.css']
})




export class RestaurantgustsComponent implements OnInit {



  logosrc
  menusrc
  res: Restaurant[] = []
  formValue!: FormGroup
  currentURL!: any
  private token: any;
  tables: any;
  shortenedUrl: string | undefined;
  restaurant_id!: string;
  private table_id!: string;
  token_valid!: boolean;
  // res_id!:string

  timeLeft = TIME_LIMIT;
  current_lang;




  constructor(public translate: TranslateService, private location: Location, private tinyUrl: NgTinyUrlService, private res_service: RestaurantService, private route: ActivatedRoute) {
    translate.addLangs(['HEB', 'ENG', 'FRE']);

    translate.setDefaultLang('HEB')
  }

  loader = true;

  ngOnInit(): void {

    this.token_valid = false
    this.route.params.subscribe(params => {
      this.token = params['token'];
      this.res_service.ValidToken(this.token).get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
        if (ss.docs.length > 0) {
          let server_token = (((ss.docs[0] as QueryDocumentSnapshot<Table>).data().OTK))
          if (server_token == this.token) {
            this.token_valid = true

            this.restaurant_id = (((ss.docs[0] as QueryDocumentSnapshot<Table>).data().restaurant_id))
            this.logosrc = this.logo()
            this.table_id = (((ss.docs[0] as QueryDocumentSnapshot<Table>).data().table_id))
            // console.log("res_id2",this.restaurant_id)
            // console.log("table_id",this.table_id)

            // console.log("before",this.restaurant_id, this.table_id)
          }
       
          // this.logosrc=this.logo(this.restaurant_id)
        }

        else {

          this.ngOnInit()
        }
      }

      )
      // console.log("write here",this.restaurant_id)
      // this.logosrc=this.logo(this.restaurant_id)
    })
    // console.log("write here",this.restaurant_id)

    this.menusrc = this.menu()

    setTimeout(() => {
      this.loader = false;
    }, 2500);



    document.querySelectorAll<HTMLElement>(".card_button").forEach(function (item) {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        (document.querySelector(".card__text h1") as HTMLElement).style.display = 'none';
        (document.querySelector(".menu") as HTMLElement).style.display = 'none';
        (document.querySelector(".card__timer") as HTMLElement).style.display = 'block';
        (document.querySelector("h3") as HTMLElement).style.display = 'block';

        document
          .querySelectorAll<HTMLElement>(".card__block:not(.card__timer)")
          .forEach(function (el) {
            el.style.display = "none"
          });

      })
    })

    // if(document.querySelector(".continue")){
    //   console.log("inside continue")


    // document.querySelector(".continue")!.addEventListener("click",(e: Event) => {
    //   e.preventDefault();

    //   console.log("inside continue")

    //   this.res_service.ValidRestorantAndTable(this.restaurant_id, this.table_id).get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
    //   this.res_service.CallService((ss.docs[0] as QueryDocumentSnapshot<Table>).id)
    //   })

    //   (document.querySelector(".card__timer") as HTMLElement).style.display = 'block';
    //   document
    //     .querySelectorAll<HTMLElement>(".card__block:not(.card__timer)")
    //     .forEach(function (el: HTMLElement) {
    //       el.style.display = "none";
    //     });
    //     startTimer()

    // });
    // }

    // document.querySelector(".reset")!.addEventListener("click", function (e: Event) {
    //   e.preventDefault();
    //   (document.querySelector(".card__buttons") as HTMLElement).style.display = "flex";
    //   document
    //     .querySelectorAll<HTMLElement>(".card__block:not(.card__buttons)")
    //     .forEach(function (el: HTMLElement) {
    //       el.style.display = "none";
    //     });



    // })



  }

  getLanguageFlag(): string {
    let style = 'flag-icon flag-icon-';
    return this.current_lang === 'en' ? `${style}gb` : `${style}${this.current_lang}`;
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  lastpage() {
    window.location.reload()
  }



  formatTime(time: number) {
    let hours: number | string = Math.floor(time / 3600);
    let minutes: number | string = Math.floor(time / 60);
    let seconds: number | string = time % 60;


    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }




  startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1;
      this.timeLeft = TIME_LIMIT - timePassed;

      // document.getElementById("base-timer-label")!.innerHTML = `<span>${this.formatTime(this.timeLeft)}</span>`;

      // this.setCircleDasharray();
      // this.setRemainingPathColor(this.timeLeft);

      // console.log("inside timer")    
      if (this.timeLeft === 0) {
        this.onTimesUp();


      }
    }, 1000);
  }

  async timer(res_id: string, table_id: string) {
    this.startTimer()
    await this.sleep(40000)
    this.Update_call(res_id, table_id)
    console.log("off call")
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  async onTimesUp() {

    await clearInterval(timerInterval!);
    (document.querySelector(".card__question") as HTMLElement).style.display = "flex";
    document
      .querySelectorAll<HTMLElement>(".card__block:not(.card__question)")
      .forEach(function (el: HTMLElement) {
        el.style.display = "none";
      });
    timePassed = 0;
    this.timeLeft = TIME_LIMIT;
    timerInterval = null;

  }





  // setRemainingPathColor(timeLeft) {

  //   const { alert, warning, info } = COLOR_CODES;
  //   // console.log("warning",warning.threshold)
  //   // console.log(timeLeft)
  //   console
  //   if (timeLeft <= alert.threshold!) {
  //     // console.log("inside 1")

  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.remove(warning.color);
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.add(alert.color);

  //   }
  //   if (timeLeft >= warning.threshold!) {
  //     // console.log("inside 2")
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.remove(warning.color);
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.add(info.color);

  //   }
  //   if (timeLeft >= alert.threshold! && timeLeft <= warning.threshold!) {
  //     // console.log("inside 3")
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.remove(info.color);
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.add(warning.color);
  //   }

  //   if (timeLeft == 0) {
  //     // console.log("inside 4")
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.remove(alert.color);
  //     document
  //       .getElementById("base-timer-path-remaining")!
  //       .classList.add(info.color);
  //   }
  // }



  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  // setCircleDasharray() {
  //   const circleDasharray = `${(
  //     this.calculateTimeFraction() * FULL_DASH_ARRAY
  //   ).toFixed(0)} 283`;
  //   document
  //     .getElementById("base-timer-path-remaining")!
  //     .setAttribute("stroke-dasharray", circleDasharray);


  // }


  async logo() {

    this.logosrc = await this.res_service.Get_logo(this.restaurant_id)
    console.log("logo", this.logosrc)
    
    return this.logosrc
  }


  menu() {

    this.res_service.get_menu().get().subscribe((ss: { docs: { data: () => Restaurant; }[]; }) => {


      this.menusrc = ss.docs.filter(rest => {
        return rest.data().res_id == this.restaurant_id
      }).map(rest => {
        return rest.data().menu
      }).pop()

      return this.menusrc

    })

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




  CallService() {
    console.log("res_id", this.restaurant_id)

    this.res_service.ValidRestorantAndTable(this.restaurant_id, this.table_id).get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
      this.res_service.CallService((ss.docs[0] as QueryDocumentSnapshot<Table>).id, this.restaurant_id)
      this.timer(this.restaurant_id, this.table_id)
    })
  }

  CallBill() {
    this.timer(this.restaurant_id, this.table_id)
    this.res_service.ValidRestorantAndTable(this.restaurant_id, this.table_id).get().subscribe((ss: { docs: { data: () => Table; }[]; }) => {
      this.res_service.CallBill((ss.docs[0] as QueryDocumentSnapshot<Table>).id, this.restaurant_id)

    })
  }



  async Update_call(res_id: string, table_id: string) {
    // console.log("getting inside update_call",table_id)

    await this.res_service.ValidRestorantAndTable(res_id, table_id).get().subscribe(async (ss: { docs: { data: () => Table; }[]; }) => {
      await this.res_service.Updatecall((ss.docs[0] as QueryDocumentSnapshot<Table>).id)

      // console.log( "this is the test",this.res_service.ValidRestorantAndTable(res_id, table_id))
      // console.log("table1", ((ss.docs[0] as QueryDocumentSnapshot<Table>).id))
    })
  }

  async stop_function() {
    this.Update_call(this.restaurant_id, this.table_id)
    this.onTimesUp()

  }

  // courrent_lange(){

  // if (this.current_lang =="HEB"){
  // let src="https://tenbis-static.azureedge.net/10bis-spa-static-prod/assets/he-cdb854.svg"
  // return src
  // }  
  // if (this.current_lang =="ENG"){
  //   let src="https://tenbis-static.azureedge.net/10bis-spa-static-prod/assets/en-6f1d6d.svg"
  //   return src
  //   }
  // return
  // }





}
