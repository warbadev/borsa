import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { locationTablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { locationModalComponent } from './modal/modal.component';
import{locationCategoriesComponent} from './Categories/categories.component'
import{locationCommentsComponent} from './Comments/Comments.component'

@NgModule({
  imports: [
    ThemeModule,
    locationTablesRoutingModule,
    Ng2SmartTableModule,
  ],entryComponents: [
    locationModalComponent,locationCategoriesComponent,locationCommentsComponent
    
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    SmartTableService
  ],
})
export class locationTablesModule { }
