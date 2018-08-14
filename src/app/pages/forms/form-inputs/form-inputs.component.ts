import { Component } from '@angular/core';
import { HttpClient, JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./form-inputs.component.scss'],
  templateUrl: './form-inputs.component.html',
})
export class FormInputsComponent {

  starRate = 2;
  heartRate = 4;
  comment:String;
  uri = 'http://localhost:4000/RatingLocation';
locationid:String="5b6b2f76ec4c0866a4844f18";
constructor( private http: HttpClient) {
}
  rate(){
    //this.data.AreaId=this.parameter.AreaId
    let object={
      Comment:this.comment,
      userid:'5b675902bbd8f154f27afefa',
      username:'kjnklmlk'
    }
    this.http.post(`${this.uri}/addComment/${this.locationid}`,object)
      .subscribe(res => {
     //   this.emitData.next(this.data)
     //   this.activeModal.close();
     console.log(res)
      });
  }
}
