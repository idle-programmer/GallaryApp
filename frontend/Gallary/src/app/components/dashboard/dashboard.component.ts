import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from 'src/app/services/home-service.service';
import {  HttpHeaders,HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'multipart/form-data; boundary=---------------------------1234567890'
  })
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
// export class DashboardComponent {

// }

export class DashboardComponent implements OnInit {

  api_url: string = 'http://127.0.0.1:8000/';
  form!: FormGroup;
  response: any;
  imageURL: any;
  file!: File;
  username:any= sessionStorage.getItem('username')
  // title!: string;
  

  constructor(private formBuilder: FormBuilder, private uploadService: HomeServiceService,private http: HttpClient) { }

  ngOnInit() {
    this.form = new FormGroup({
      title:new FormControl("",[Validators.required])
    })
  }

  // onChange(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     // console.log(file)
  //     // this.form.value.profile.setValue(event.target.files[0]);
  //     this.form.setValue({
  //       File:file
  //     })
  //   }
  // }

  onSubmit() {
    // console.log(this.form)
    // const formdata= {
    //   File : this.form.value.File,
    //   title:this.form.value.title,
    //   username : sessionStorage.getItem('username'),
    //   time : new Date().toISOString()
    // }
    // this.uploadService.upload(formdata).subscribe(
    //   (res) => {
    //     this.response = res;
    //     this.imageURL = `${this.api_url}${res.file}`;
    //     console.log(res);
    //     console.log(this.imageURL);
    //   },
    //   (err) => {  
    //     console.log(err);
    //   }
    // );
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      // formData.append('title',this.form.controls['title'].value)
      // formData.append('username',this.username)
      // formData.append('time',new Date().toISOString())
      this.http.post('http://127.0.0.1:8000/media/', formData,httpOptions).subscribe((response: any) => {
        // if (response.status === 'success') {
        //   // this.refresh();
        // } else {
        //   alert('Upload failed');
        // }
      });
    }
  }
}
