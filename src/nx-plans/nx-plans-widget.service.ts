import { Injectable} from '@angular/core'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'
import { Plan } from './nx-plans-widget.component'
//import { FetchClient  } from '@c8y/ngx-components/api'
import { IFetchOptions } from '@c8y/client'
import { FetchClient } from '@c8y/client';

@Injectable({
    providedIn: 'root'
  })
export class PlanService{
  constructor(
    private fetchClient: FetchClient
  ) { 
  }
  

  getPlans(query): Observable <Plan[]> {
    const options: IFetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
    console.log ("Now calling", query);
    //Create and return an Observable.
    return null
    // return new Observable <Plan[]>(observer => {
    //   //Make use of Fetch API to get data from URL                              
    //   this.fetchClient.fetch(`service/nitrobox/v2/plans?search=name==${query}`, options)
    //     .then(res => {
    //       /*The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
    //       return res.json();
    //     })
    //     .then(body => {
    //       let result : Plan[] = [];
    //       body.forEach((plan: Plan) => result.push(plan));
    //       //console.log ("Result", result);
    //       observer.next(result);
    //       /*Complete the Observable as it won't produce any more event */
    //       observer.complete();
    //     })
    //     //Handle error
    //     .catch(err => observer.error(err));
    // })
    
  }

}