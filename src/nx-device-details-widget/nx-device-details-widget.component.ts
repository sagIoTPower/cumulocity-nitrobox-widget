import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { InventoryService } from '@c8y/client';
import { NxDeviceDetailsWidgetService } from './nx-device-details-widget.service';



@Component({
  selector: 'lib-nx-device-details-widget',
  templateUrl: './nx-device-details-wiget.html',
  styleUrls: ['card-fancy-example.css']
})
export class NxDeviceDetailsWidgetComponent implements OnInit {

  @Input() config;
  deviceDetails: any;
  subscription: any;

  constructor(
    public nxDetailService: NxDeviceDetailsWidgetService,
    public inventory: InventoryService,
  ) { }

  async ngOnInit() {
    //console.log(this.config);

    this.nxDetailService.fetchManagedObject(this.config.device.id).then(
        (data) => {
        this.deviceDetails = data.c8y_Billing;
        console.log(this.deviceDetails);
      }
    );

    console.log("Start subscription ...", this.config);
    this.subscription = this.nxDetailService.subscribeToMOChannel(
      this.config.device.id,
      this.updateMO.bind(this)  //bind the component to update
    );
  }

  ngOnDestroy(): void {
    console.log("Stop subscription");
    this.nxDetailService.unsubscribeFromMOChannel(this.subscription);
  }

  updateMO(d: object): void {
    let o = d['data']['data'];
    //console.log("Changed MO:", o)
    this.deviceDetails = o['c8y_Billing'];
  }
}