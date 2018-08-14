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

export class ItemModalComponent implements OnInit {

  @Input() parameter;

  @Output() emitData = new EventEmitter();

  modalHeader: string;
  uri = 'http://localhost:4000/areas';

  public image1: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  public image2: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  public image3: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  public image4: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });
  public image5: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  data: {
    AR_name: String ,
    EN_name: String,
    Lat: String,
    Lng: String,
    AR_desc: String,
    EN_desc: String,
    Image: {image1:String,image2:String,image3:String,image4:String,image5:String},
  }={AR_name :'' ,
  EN_name: '',
  Lat: '',
  Lng: '',
  AR_desc: '',
 EN_desc: '',
 Image: {image1:'',image2:'',image3:'',image4:'',image5:''} ,}
  


  constructor(private activeModal: NgbActiveModal, private http: HttpClient) {

  }
  ngOnInit() {
    console.log(this.parameter)

    if (this.parameter.action==false){
      
    
      this.data.AR_name=this.parameter.data.AR_name ;
      this.data.EN_name= this.parameter.data.EN_name;
      this.data.Lat= this.parameter.data.Lat;
      this.data.Lng= this.parameter.data.Lng;
      this.data.AR_desc= this.parameter.data.AR_desc;
      this.data.EN_desc= this.parameter.data.EN_desc;
      if(this.parameter.data.Image== undefined){
        this.data.Image= {image1:'',image2:'',image3:'',image4:'',image5:''} 

      }else
      this.data.Image= this.parameter.data.Image;
    }
    this.image1.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.image1.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
      let x = JSON.parse(response)
      this.data.Image.image1 = "http://localhost:4000/uploads/" + x.filename
      // alert('File uploaded successfully');
    };
    this.image2.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.image2.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
      let x = JSON.parse(response)
      this.data.Image.image2 = "http://localhost:4000/uploads/" + x.filename
      // alert('File uploaded successfully');
    };
    this.image3.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.image3.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
      let x = JSON.parse(response)
      this.data.Image.image3 = "http://localhost:4000/uploads/" + x.filename
      // alert('File uploaded successfully');
    };
    this.image4.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.image4.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
      let x = JSON.parse(response)
      this.data.Image.image4 = "http://localhost:4000/uploads/" + x.filename
      // alert('File uploaded successfully');
    };
    this.image5.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.image5.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log(JSON.parse(response));
      let x = JSON.parse(response)
      this.data.Image.image5 = "http://localhost:4000/uploads/" + x.filename
      // alert('File uploaded successfully');
    };
  }
  closeModal() {
    this.activeModal.close();

  }
  create(){
    if (window.confirm('Are you sure you want to create?')) {
//      event.newData['name'] += ' + added in code';
   //   console.log(event)
     
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

   

    console.log(this.data)
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
}
