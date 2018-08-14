import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{locationCategoriesComponent} from './Categories/categories.component'
import { locationTablesComponent } from './tables.component';
import { locationTableComponent } from './smart-table/smart-table.component';
import { locationModalComponent } from './modal/modal.component';
import { locationCommentsComponent } from './Comments/Comments.component';

const routes: Routes = [{
  path: '',
  component: locationTablesComponent,
  children: [{
    path: 'locationCategories',
    component: locationCategoriesComponent,
  },{
    path: 'locationtable',
    component: locationTableComponent,
  },
  {
    path: 'locationComments',
    component: locationCommentsComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class locationTablesRoutingModule { }

export const routedComponents = [
  locationTablesComponent,
  locationModalComponent,
  locationTableComponent,
  locationCategoriesComponent,
  locationCommentsComponent,
];
