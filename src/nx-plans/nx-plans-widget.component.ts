import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { PlanService } from './nx-plans-widget.service'
import { IManagedObject, InventoryService } from '@c8y/client';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'c8y-nx-plan-list',
  templateUrl: './nx-plans-widget.component.html'
})
export class NxPlansWidgetComponent implements OnInit {
  @Input() config;
  plans$: Observable<Plan[]>;
  plans: Plan[];
  deviceDetails: any;
  private searchTerms = new Subject<string>();

  constructor(private planService: PlanService, public inventory: InventoryService,) { }

  // Push a search term into the observable stream.
  searchPlans(term: string): void {
    console.log("New search", term);
    this.searchTerms.next(term);
    this.plans$.subscribe((data) => {
      this.plans = []
      data.forEach(plan => this.plans.push(plan))
      //console.log("New plans", this.plans);
    }
    );
  }

  async ngOnInit() {
    //console.log(this.config);
    //    this.deviceExtId = await this.device.getDeviceData(this.config);

    const detail$ = this.inventory.detail$(this.config.device.id);
    detail$.subscribe((data) => {
      this.deviceDetails = data.c8y_Billing;
      console.log(this.deviceDetails);
    }
    );

    this.plans$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(1000),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.planService.getPlans(term)),
    );

    this.searchPlans("");
    this.searchPlans("*");
  }

  onChange(event) {
    //console.log("onChangeGeneric:", event.target.checked, event.target.id)
    this.plans.forEach(plan => {
      if (event.target.id == "selected-" + plan.planId) {
        const partialUpdateObject: Partial<IManagedObject> = {
          c8y_Billing:  {
            ...this.deviceDetails,
            ...{ planId: plan.planId+'' }
          },
          id: this.config.device.id
        };

        (async () => {
          const { data, res } = await this.inventory.update(partialUpdateObject);
        })();
        plan.selected = event.target.checked
      } else {
        plan.selected = false
      }
    })
    console.log("onChangeGeneric:", this.plans)
  }
}

export class Plan {
  constructor(planId: string, planIdent: string, name: string, optionsProductname: string, selected: boolean) {
    this.planId = planId
    this.planIdent = planIdent
    this.name = name
    this.optionsProductname = optionsProductname
    this.selected = selected
  }
  planId: string
  planIdent: string
  name: string
  optionsProductname: string
  selected: boolean
}