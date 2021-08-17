import { Component, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { PlanService } from './nx-plans-widget.service'

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'c8y-nx-plan-list',
  templateUrl: './nx-plans-widget.component.html'
})
export class NxPlansWidgetComponent implements OnInit {
    plans$: Observable<Plan[]>;
    private searchTerms = new Subject<string>();
  
    constructor(private planService: PlanService) {}
  
    // Push a search term into the observable stream.
    searchPlans(term: string): void {
      this.searchTerms.next(term);
    }
  
    ngOnInit(): void {
      this.plans$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
  
        // ignore new term if same as previous term
        distinctUntilChanged(),
  
        // switch to new search observable each time the term changes
        switchMap((term: string) => this.planService.getPlans(term)),
      );
    }

    onChange(event) {
      console.log("onChangeGeneric:", event.target.value, event.target.id);
    }
}

export class Plan {
  constructor(planId: string, planIdent: string, name: string,selected: boolean) {
    this.planId = planId
    this.planIdent = planIdent
    this.name = name
    this.selected = selected
  }
  planId: string
  planIdent: string
  name: string
  selected: boolean
}