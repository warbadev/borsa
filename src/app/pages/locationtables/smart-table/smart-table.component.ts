import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { locationModalComponent } from '../modal/modal.component';
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
export class locationTableComponent implements OnInit {

  a: Array<any>;
  uriArea = 'http://localhost:4000/areas';
  uriLocation = 'http://localhost:4000/locations';

  areas:Array<any>;
  area:String;
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
      },
      CategoriesId: {
        title: "categoryid",
        type: 'string',
        show: false
      }

    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private http: HttpClient, private modalService: NgbModal) {
   }
    ngOnInit() {
    this.getAreas().subscribe(x => {
      this.areas = JSON.parse(JSON.stringify(x));
      console.log(this.areas)
     // this.source.load(this.a);
      //this.source.refresh();
    });
  }


  Open(event, action: Boolean) {
    console.log(action)

    if (action) {
      event = {
        action: true,
        AreaId:this.area
      }
      console.log(event)

    } else {
      console.log(action)
      console.log(event)

      event.action = false;
event.AreaId=this.area
    }
    const activeModal = this.modalService.open(locationModalComponent, { size: 'lg', container: 'nb-layout', });

    activeModal.componentInstance.parameter = event

    activeModal.componentInstance.emitData.subscribe(($e) => {
      this.getLocations().subscribe(x => {
        this.a = JSON.parse(JSON.stringify(x));
        this.source.load(this.a);
        this.source.refresh();

      });
    })
  }



SubLocations(){
  console.log("ds");
  this.getLocations().subscribe(x => {
    this.a = JSON.parse(JSON.stringify(x));
    console.log(this.a)
    this.source.load(this.a);
    this.source.refresh();
  });
}
  getAreas() {

    return this
      .http
      .get(`${this.uriArea}/`).map(res => {
        return res;
      });
  }
  getLocations() {
console.log(this.area);
    return this
      .http
      .get(`${this.uriLocation}/get/${this.area}`).map(res => {
        return res;
      });
  }


}
