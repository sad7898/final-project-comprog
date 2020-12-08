import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from './search.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SearchRoutingModule
  ],
  declarations: [Search]
})
export class SearchModule {}
