import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { aTablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { ItemModalComponent } from './modal/modal.component';
import {  FileUploader, FileSelectDirective,} from 'ng2-file-upload/ng2-file-upload';

const routes: Routes = [{
  path: '',
  component: aTablesComponent,
  children: [{
    path: 'asmarttable',
    component: SmartTableComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class aTablesRoutingModule { }

export const aroutedComponents = [
  aTablesComponent,
  ItemModalComponent,
  SmartTableComponent,
  
  
];
