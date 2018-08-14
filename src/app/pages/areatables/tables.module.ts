import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { aTablesRoutingModule, aroutedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ItemModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
    aTablesRoutingModule,
    Ng2SmartTableModule,
  ],entryComponents: [
    ItemModalComponent
  ],
  declarations: [
    ...aroutedComponents
  ],
  providers: [
    SmartTableService
  ],
})
export class aTablesModule { }
