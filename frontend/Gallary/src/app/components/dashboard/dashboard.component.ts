import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeServiceService } from 'src/app/services/home-service.service';
import {  HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog'
import { ViewdetailsComponent } from '../viewdetails/viewdetails.component';
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
  fileArray:any[] = [];

  

  constructor(private uploadService: HomeServiceService,private http: HttpClient,private router: Router,public dialog:MatDialog) {}

  ngOnInit() {
    if(!sessionStorage['username']){
      this.router.navigate(['/home'])
    }
    this.form = new FormGroup({
      title:new FormControl("",[Validators.required])
    })
    this.getfiles()
  }

  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file
    }
  }

  onSubmit() {
    if (this.file) {
      const formData = new FormData();
      formData.append('File',this.file);
      formData.append('title',this.file.name)
      formData.append('username',this.username)
      formData.append('time',new Date().toISOString().substring(0, 10))
      this.http.post('http://127.0.0.1:8000/media/', formData).subscribe((response: any) => {
        if (response && response.mediaId) {
          alert("File has been Successfully Added")
          location.reload();
        } 
        else {
          alert('Upload failed');
        }
      });
    }
  }

  public getfiles(){
    this.uploadService.getMedia().subscribe((data: any)=>{
      // console.log("getfiles",data)
      this.fileArray = data
      this.fileArray.forEach(function(item){
          let str = item['title']
          let s1 = str.substring(str.length - 3, str.length)
          // console.log(s1)
          if (s1 == 'mp4'){
            item['type'] = 'video'
          }
          else{
            item['type'] = 'image'
          }
          let url = item['File']
          item['File'] = 'http://127.0.0.1:8000' + url
      })
      // console.log(this.fileArray)
    })
  }

  public deleteFile(username:any,mediaId:any){
    if(username == sessionStorage['username']){
      this.uploadService.deleteMedia(mediaId).subscribe((data:any)=>{
        console.log(data)
        if(data && data.msg=='File Deleted'){
          alert(data.msg)
          location.reload();
        }
        else{
          alert(data.msg)
          location.reload();
        }
      })
    }
    else{
      alert("You cannot delete this file. Because you are not the owner of this file")
      location.reload();
    }
    
  }

  logout():void{
    this.uploadService.logout(sessionStorage.getItem('data')).subscribe(
    (data:any)=>{
      sessionStorage.clear()
      this.router.navigate(['/home']);
    },
    (error) => {
        sessionStorage.clear()
        this.router.navigate(['/home']); 
    })
  }

  openView(data:any){
    const dialogRef = this.dialog.open(ViewdetailsComponent,{
      disableClose:true,
      data:data

    });
  }
}
