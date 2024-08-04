
import { Queue } from 'queue-typescript';


export class userComponent{

    static savedComponents : Array<userComponent> = new Array<userComponent>; 

    static addComp(res:string, num:number){
        console.log(this.savedComponents);
        var index = this.savedComponents.findIndex((rest: userComponent) => {
            console.log(`${rest.id} --- ${res}`);
            console.log(`${rest.id == res}`)
            return rest.id == res
        })
        console.log(`test--- ${index} -- res ${res}`);
        if((index) != -1){
            this.savedComponents[index].calls.push(num);
        }
        else{
            this.savedComponents.push(new userComponent(res))
            index = this.savedComponents.length-1;
        }

        return this.savedComponents[index];
    }

    static getResturantData(name: string){
        const index = this.savedComponents.findIndex(rest => {rest.id == name})
        if (index == -1){
            throw "Unknown name for restuarnt";
        }

        return this.savedComponents[index];
    }


    id: string= " ";
    tabels: any = [];
    calls: Array <number> = new Array<number>();
    userconect: number = 0 ;
    
    constructor(nameOfResturant: string){
        this.id = nameOfResturant;        
    
        userComponent.savedComponents.push(this);    
    }

    
    
}