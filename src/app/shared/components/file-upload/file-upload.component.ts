import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnChanges {
  serverImageUrl=environment.imageUrl;
  imgUrl:any="assets/images/avatars/profile.jpg";
  @Input('currentImage') currentImage;
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnChanges() {    
    
    if(this.currentImage){
      this.imgUrl = this.serverImageUrl + this.currentImage;
    }
  }

  

  updateProfilePic(event) {
    const myReader: FileReader = new FileReader();
    this.onSelect.emit(event.target.files[0]);
    
    myReader.onloadend = (e) => {
      this.imgUrl = myReader.result;
    };
    myReader.readAsDataURL(event.target.files[0]);
  }

}
