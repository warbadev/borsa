import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
    selector: 'ngx-categories',
    templateUrl: './categories.component.html',
    styles: [`
    
      nb-card {
        transform: translate3d(0, 0, 0);
      }
    `],
  
  })
  export class locationCategoriesComponent implements OnInit {
    CategoriesIds:String;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,

    },
    delete: {

      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'number',
        show:false,
      },
      AR_name: {
        title: 'Arabic Name',
        type: 'string',
      },
      EN_name: {
        title: 'English Name',
        type: 'string',
      },
      
    },
  };
  source: LocalDataSource = new LocalDataSource();
  uriCategories= 'http://localhost:4000/LocationsCategories';

  constructor(private http: HttpClient)  {

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
        this.http.get(`${this.uriCategories}/delete/${event.data._id}`).subscribe(x => {
 // this.emitData.next('')
   //         this.activeModal.close();
          });
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event): void {
    if (window.confirm('Are you sure you want to create?')) {
       // event.newData['name'] += ' + added in code';
       // this.data.AreaId=this.parameter.AreaId
       console.log(event.newData)
      var x={
          AR_name:event.newData.AR_name,
          EN_name:event.newData.EN_name
      }
        this.http.post(`${this.uriCategories}/add`, x)
          .subscribe(res => {
              console.log(res)
            //this.emitData.next(this.data)
          //  this.activeModal.close();
          });
        event.confirm.resolve(event.newData);
      } else {
        event.confirm.reject();
      }
    
  }

  onSaveConfirm(event) {
      console.log(event);
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      this.http.post(`${this.uriCategories}/update/${event.newData._id}`, event.newData)
      .subscribe(res => {
       // this.emitData.next(this.data)
        //this.activeModal.close();
      });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
}


    ngOnInit() {
        this.getCategories().subscribe(x => {
            let categories = JSON.parse(JSON.stringify(x));
            console.log(categories)
            this.source.load(categories);
            this.source.refresh();
          });
        };
   
        getCategories() {

            return this
              .http
              .get(`${this.uriCategories}/`).map(res => {
                return res;
              });
          }
}