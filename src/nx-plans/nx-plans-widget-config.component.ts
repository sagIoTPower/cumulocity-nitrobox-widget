import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'c8y-nx-plan-list-config',
  templateUrl: './nx-plans-widget-config.component.html'
})
export class NxPlansWidgetConfigComponent implements OnInit {
  @Input() config: any = {}; 
  constructor() { }

  ngOnInit() {
  }

}
