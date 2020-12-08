import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dashboard } from './dashboard.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DashboardRoutingModule
  ],
  declarations: [Dashboard]
})
export class DashboardModule {}
