import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nx-device-details-widget-config',
  templateUrl: './nx-device-details-widget-config.component.html',
  styleUrls: ['./nx-device-details-widget-config.component.css']
})
export class NxDeviceDetailsWidgetConfigComponent implements OnInit {
  @Input() config: any = {}; 
  constructor() { }

  ngOnInit() {
  }

}
