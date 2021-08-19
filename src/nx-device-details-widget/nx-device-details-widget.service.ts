import { Injectable } from '@angular/core';
import { InventoryService, IdentityService, Realtime, IManagedObject } from '@c8y/client';

@Injectable()
export class NxDeviceDetailsWidgetService {

  constructor(public inventory: InventoryService,
    public identity: IdentityService,
    private realtime: Realtime) { }

  public async fetchManagedObject<IManagedObject>(id: string) {
    try {
      const { data, res } = await (this.inventory.detail(id));
      return data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }


  subscribeToMOChannel(id: string, callback: (s: object) => void): object {
    return this.realtime.subscribe(`/managedobjects/${id}`, callback);
  }

  unsubscribeFromMOChannel(subscription: object): object {
    return this.realtime.unsubscribe(subscription);
  }

}