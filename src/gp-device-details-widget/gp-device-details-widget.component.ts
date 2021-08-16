import { Component, OnInit, Input } from '@angular/core';
import { GpDeviceDetailsWidgetService } from './gp-device-details-widget.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
// import { GpDeviceDetailsWidgetConfigComponent } from '../gp-device-details-widget-config/gp-device-details-widget-config.component';
import { InventoryService, IdentityService } from '@c8y/client';


@Component({
  selector: 'lib-gp-device-details-widget',
  templateUrl: './gp-device-details-wiget.html',
  styleUrls: ['card-fancy-example.css']
})
export class GpDeviceDetailsWidgetComponent implements OnInit {

  @Input() config;
  mfdDate: any;
  maintDate: any;
  deviceExtId: any;
  deviceDetails: any;
  deviceNDetails: any;


  constructor(private http: HttpClient,
    private datePipe: DatePipe,
    //             private device: GpDeviceDetailsWidgetService,
    public inventory: InventoryService,
    public identity: IdentityService,
  ) { }

  async ngOnInit() {
    //console.log(this.config);
    console.log(this.deviceNDetails);

    //    this.deviceExtId = await this.device.getDeviceData(this.config);

    //this.deviceNDetails = inventory.det
    const detail$ = this.inventory.detail$(this.config.device.id);
    detail$.subscribe((data) => {
      this.deviceNDetails = data.c8y_Billing;
    }
    );

    // this.device.getDeviceData(this.config).then(response => {
    //  this.deviceExtId = response;
    // });


    /*     this.getDeviceDetails().subscribe((devData) => {
          console.log(devData);
          this.deviceDetails = devData.DeviceDetail;
          console.log('----------------******************-----------');
          console.log(this.deviceDetails);
    
          this.mfdDate = this.datePipe.transform(this.deviceDetails.manufactureDate, "MMM d, y");
    
          this.maintDate = this.datePipe.transform(this.deviceDetails.nextScheduledMaintenance, "MMM d, y");
          console.log(this.maintDate); //output - Feb 14, 2019, 3:45:06 PM
    
        }); */

  }

}
