import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { ItemModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/map';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
  
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],

})
export class SmartTableComponent {

  a: Array<any>;
  uri = 'http://localhost:4000/areas';
  settings = {
    mode: 'oncustom',
    actions: false,

    columns: {
      _id: {
        // editable:false,
        title: 'ID',
        type: 'string',
        show: false,
      },
      AR_name: {
        title: 'Arabic Name',
        type: 'string',
      },
      EN_name: {
        title: 'English Name',
        type: 'string',
      },
      Lat: {
        title: 'latitude',
        type: 'string',
      },
      Lng: {
        title: 'longititude',
        type: 'string',
      },
      AR_desc: {
        title: 'arabic description',
        type: 'string',
        show: false,
      },
      EN_desc: {
        title: 'english description',
        type: 'string',
        show: false,
      },
      Front_Image: {
        title: "fron image url",
        type: 'string',
        show: false
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private http: HttpClient, private modalService: NgbModal) {

    this.getAreas().subscribe(x => {
      this.a = JSON.parse(JSON.stringify(x));
      this.source.load(this.a);
      this.source.refresh();
    });
  }


  Open(event, action:Boolean) {
    console.log(action)

if(action){
  console.log(action)
  event={
    action:true,
  }

}else{
  console.log(action)

  event.action=false;

}
const activeModal = this.modalService.open(ItemModalComponent, { size: 'lg', container: 'nb-layout', });

activeModal.componentInstance.parameter = event

    activeModal.componentInstance.emitData.subscribe(($e) => {
      this.getAreas().subscribe(x => {
        this.a = JSON.parse(JSON.stringify(x));
        this.source.load(this.a);
        this.source.refresh();

      });
    })
  }



  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      console.log(event)
      const obj = {
        AR_name: event.newData.AR_name,
        EN_name: event.newData.EN_name,
        Lat: event.newData.Lat,
        Lng: event.newData.Lng,
        AR_desc: event.newData.AR_desc,
        EN_desc: event.newData.EN_desc,
      };
      this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  getAreas() {

    return this
      .http
      .get(`${this.uri}/`).map(res => {
        return res;
      });
  }


}
