import { NgModule } from '@angular/core';
import { CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { CockpitDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ReportsModule } from '@c8y/ngx-components/reports';
import { NxPlansWidgetComponent } from './nx-plans-widget.component';
import { NxPlansWidgetConfigComponent } from './nx-plans-widget-config.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { PlanService } from './nx-plans-widget.service';
import { DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    NxPlansWidgetComponent, NxPlansWidgetConfigComponent, 
  ],
  imports: [
    CoreModule,
    AssetsNavigatorModule,
    ReportsModule,
    CockpitDashboardModule,
    MatCardModule
  ],
  entryComponents: [
    NxPlansWidgetComponent, NxPlansWidgetConfigComponent, 
  ],
  providers: [
    HttpClient,
    DatePipe,
    PlanService,
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: "com.softwareag.nx.plans.widget",
        label: "Display nitrobox plans widget",
        description:
          "Display nitrobox plans widget",
        component: NxPlansWidgetComponent,
        configComponent: NxPlansWidgetConfigComponent,
        // comment this if you want to test the widget
        //previewImage: require("~styles/previewImage.png"),
        data: {
          settings: {
            noNewWidgets: false, // Set this to true, to don't allow adding new widgets.
            groupsSelectable: true,
            // ng1: {
            //   options: {
            //     noDeviceTarget: false,     // Set this to true to hide the device selector.
            //     groupsSelectable: true,  // Set this, if not only devices should be selectable.
            //   }
            // }
          },
        },
      },
    },
  ],
})
export class NxPlansWidgetModule  {
}