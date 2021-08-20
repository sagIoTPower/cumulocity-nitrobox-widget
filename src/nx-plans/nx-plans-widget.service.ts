import { Injectable} from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Plan, Option } from './nx-plans-widget.component'
import { IFetchOptions, FetchClient } from '@c8y/client'

@Injectable()
export class PlanService{
  constructor(
    private fetchClient: FetchClient,
  ) { 
  }
  
  getPlans(query): Observable <Plan[]> {
    const options: IFetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
    console.log ("Now calling", query);
    //Create and return an Observable.
    return new Observable <Plan[]>(observer => {
      //Make use of Fetch API to get data from URL                              
      this.fetchClient.fetch(`service/nitrobox/v2/plans?search=name==${query}`, options)
        .then(res => {
          if (res.status == 500) {
            throw `Server error: [${res.status}]`;
          }
          /*The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
          return res.json();
        })
        .then(body => {
          let result : Plan[] = [];
          body.forEach((plan) => 
          { result.push(plan)
            plan.selected = false
            plan.optionsProductname = plan['phases'][0]['options'].map(element => element['name']).join('/');  
            let options : Option[] = [];
            plan['phases'][0]['options'].forEach(option => {options.push( new Option(option.name, option.itemPriceNet, option.currency))             
            });
            // plan['phases'][0]['options'].forEach(option => {console.log("Option",option)             
            // });
            plan.options = options;
            //console.log ("WWW", plan.optionsProductname )            
          });
          console.log ("Result", result);
          observer.next(result);
          /*Complete the Observable as it won't produce any more event */
          observer.complete();
        })
        //Handle error
        .catch(err => 
          {         
            let result : Plan[] = [];
            console.log ("Error Result", result);
            observer.next(result);
            /*Complete the Observable as it won't produce any more event */
            observer.complete();
          });
    })
    
  }

}