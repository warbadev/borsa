import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { FileUploader, FileSelectDirective, } from 'ng2-file-upload/ng2-file-upload';
const URL = 'http://localhost:4000/api/upload';

@Component({
  selector: 'ngx-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],

})

export class locationModalComponent implements OnInit {

  @Input() parameter;

  @Output() emitData = new EventEmitter();

  modalHeader: string;
  uri = 'http://localhost:4000/locations';
  uriCategories= 'http://localhost:4000/LocationsCategories';
  categories:any;

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  data: {
    AR_name: String ,
    EN_name: String,
    Lat: String,
    Lng: String,
    AR_desc: String,
    EN_desc: String,
    fimage: String,
    AreaId:String,
    CategoriesId:String
  }={AR_name :'' ,
  EN_name: '',
  Lat: '',
  Lng: '',
  AR_desc: '',
 EN_desc: '',
 fimage: '' ,
 AreaId:'',
 CategoriesId:''}
  


  constructor(private activeModal: NgbActiveModal, private http: HttpClient) {

  }
  compareFn(c1, c2): boolean {
    return c1 && c2 ? c1.CategoriesId === c2.CategoriesId : c1 === c2;
}
  ngOnInit() {
    console.log(this.parameter)
    this.getCategories().subscribe(x => {
      let categories = JSON.parse(JSON.stringify(x));
      console.log(categories)
      this.categories=categories;
    //  this.source.refresh();
    });
    if (this.parameter.action==false){
      console.log(this.parameter)
      this.data.CategoriesId= this.parameter.data.CategoriesId;

      this.data.AR_name=this.parameter.data.AR_name ;
      console.log(this.parameter.data.CategoriesId)

      this.data.EN_name= this.parameter.data.EN_name;
      this.data.Lat= this.parameter.data.Lat;
      this.data.Lng= this.parameter.data.Lng;
      this.data.AR_desc= this.parameter.data.AR_desc;
      this.data.EN_desc= this.parameter.data.EN_desc;
      this.data.fimage= this.parameter.data.fimage;
      this.data.AreaId= this.parameter.AreaId;

    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
      let x = JSON.parse(response)
      this.data.fimage = "http://localhost:4000/uploads/" + x.filename
      // alert('File uploaded successfully');
    };
  }
  closeModal() {
    this.activeModal.close();

  }
  create(){
    if (window.confirm('Are you sure you want to create?')) {
//      event.newData['name'] += ' + added in code';
     console.log(this.data)
     this.data.AreaId=this.parameter.AreaId
      this.http.post(`${this.uri}/add`, this.data)
        .subscribe(res => {
          this.emitData.next(this.data)
          this.activeModal.close();
        });
     // event.confirm.resolve(event.this.da);
    } else {
      //event.confirm.reject();
      console.log('rejected')
    }
  }
  save() {
    //console.log(event);

   
  //  this.data.AreaId=this.parameter.data.AreaId

    console.log(this.data.CategoriesId)
    this.http.post(`${this.uri}/update/${this.parameter.data._id}`, this.data)
      .subscribe(res => {
        this.emitData.next(this.data)
        this.activeModal.close();
      });
  }
  Delete(): void {
    console.log(this.parameter.data._id);
    if (window.confirm('Are you sure you want to delete?')) {
      this.http.get(`${this.uri}/delete/${this.parameter.data._id}`).subscribe(x => {
        this.emitData.next('')
        this.activeModal.close();
      });
    } else {
    }
  }

  getCategories() {

    return this
      .http
      .get(`${this.uriCategories}/`).map(res => {
        return res;
      });
  }
}
