import { NgModule } from '@angular/core';
import { CoreModule, HOOK_COMPONENTS } from '@c8y/ngx-components';
import { AssetsNavigatorModule } from '@c8y/ngx-components/assets-navigator';
import { CockpitDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { ReportsModule } from '@c8y/ngx-components/reports';
import { NxDeviceDetailsWidgetComponent } from './nx-device-details-widget.component';
import { NxDeviceDetailsWidgetConfigComponent } from '../nx-device-details-widget-config/nx-device-details-widget-config.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { NxDeviceDetailsWidgetService } from '../nx-device-details-widget/nx-device-details-widget.service'
import { DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    NxDeviceDetailsWidgetComponent, NxDeviceDetailsWidgetConfigComponent, 
  ],
  imports: [
    CoreModule,
    AssetsNavigatorModule,
    ReportsModule,
    CockpitDashboardModule,
    MatCardModule
  ],
  entryComponents: [
    NxDeviceDetailsWidgetComponent, NxDeviceDetailsWidgetConfigComponent
  ],
  providers: [
    HttpClient,
    DatePipe,
    NxDeviceDetailsWidgetService,
    {
      provide: HOOK_COMPONENTS,
      multi: true,
      useValue: {
        id: "com.softwareag.advanced.asset.widget",
        label: "Monetization properties widget",
        description:
          "Shows properties relevant for the monetization",
        component: NxDeviceDetailsWidgetComponent,
        configComponent: NxDeviceDetailsWidgetConfigComponent,
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
export class NxDeviceDetailsWidgetModule  {
}