import { Injectable } from '@angular/core';
import { InventoryService, IdentityService, Realtime, IManagedObject, IFetchOptions, FetchClient } from '@c8y/client';
import { Observable } from 'rxjs';
import { Address, Debtor } from './nx-device-details-widget.component';

@Injectable()
export class NxDeviceDetailsWidgetService {

  constructor(public inventory: InventoryService,
    public identity: IdentityService,
    private realtime: Realtime,
    private fetchClient: FetchClient,
    ) { }

  public async fetchManagedObject<IManagedObject>(id: string) {
    try {
      const { data, res } = await (this.inventory.detail(id));
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  getDebtors(): Observable <Debtor[]> {
    const options: IFetchOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
    console.log ("Now calling debtor");
    //Create and return an Observable.
    return new Observable <Debtor[]>(observer => {
      //Make use of Fetch API to get data from URL                              
      this.fetchClient.fetch(`service/nitrobox/v2/debtors`, options)
        .then(res => {
          if (res.status == 500) {
            throw `Server error: [${res.status}]`;
          }
          /*The response.json() doesn't return json, it returns a "readable stream" which is a promise which needs to be resolved to get the actual data.*/
          return res.json();
        })
        .then(body => {
          let result : Debtor[] = [];
          body.forEach((debtor) => 
          { result.push(debtor)
            //debtor.selected = false
            let addresses : Address[] = [];
            debtor['addresses'].forEach(address => {addresses.push( new Address(address.addressId, address.addressType, address.city))             
            });

            debtor.addresses = addresses;
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
            let result : Debtor[] = [];
            console.log ("Error Result", result);
            observer.next(result);
            observer.complete();
          });
    })
    
  }


  subscribeToMOChannel(id: string, callback: (s: object) => void): object {
    return this.realtime.subscribe(`/managedobjects/${id}`, callback);
  }

  unsubscribeFromMOChannel(subscription: object): object {
    return this.realtime.unsubscribe(subscription);
  }

}