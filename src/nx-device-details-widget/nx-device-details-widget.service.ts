import { Injectable } from '@angular/core';
import { InventoryService, IdentityService } from '@c8y/client';

@Injectable()
export class NxDeviceDetailsWidgetService {

  constructor(public inventory: InventoryService,
              public identity: IdentityService) { }

    response: any;
    deviceExternalId: any;

    async getDeviceData(config) {

      let inventory = await this.inventory.detail(config.device.id);
      //let inventory = await this.inventory.detail("226");
      this.response = inventory.data;      
      console.log(this.response);

      //Check that the response is a Group and not a device
      if (this.response.hasOwnProperty('c8y_IsDevice')) {
        
        // Get External Id
        this.deviceExternalId = await this.getExternalId(config.device.id);
       // this.deviceExternalId = await this.getExternalId("226");

        console.log('Child Device = ' + config.device.id);

        console.log('External ID = ' + this.deviceExternalId);

      }
      else {

        alert("Please select a device for this widget to fuction correctly");
      
      }
    
      return this.deviceExternalId;
  }

  async getExternalId(id) {

    const { data, res, paging } = await this.identity.list(id);

    return data[0].externalId;

  }

}