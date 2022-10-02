import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CarImagesInterface} from '../../../spa/interfaces/CarImages.interface';
import {AppDataService} from '../../services/app-data.service';

@Component({
  selector: 'app-image-item',
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.css']
})
export class ImageItemComponent implements OnInit, OnChanges {

  @Input() imageId: number;
  @Input() viewDeleteButtons: boolean;
  @Input() mainImageId: number;
  @Input() carId: number;
  @Output() setAsMainImage: EventEmitter<any> = new EventEmitter();
  isImageLoading = false;
  imageToShow: any;
  isDeliting = false;
  deleteId: number;
  deleteError: string;
  viewDeleteButtonsClass: string;
  imageClass: string;
  isMainImage: boolean;


  constructor(public appDataService: AppDataService) { }

  ngOnInit(): void {
    this.getImageFromService(this.imageId);
    this.setViewDeleteButtonsClass();
    this.setImageClass();
  }

  createImageFromBlob(imageId: number, image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getImageFromService(imageId: number) {
    this.isImageLoading = true;
    this.appDataService.getCarImage(imageId).subscribe(data => {
      this.createImageFromBlob(imageId, data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
  }

  deleteCarQuestion(id: number): void {
    // @ts-ignore
    this.deleteError = null;
    this.deleteId = id;
  }

  cancelDelete(): void {
    this.isDeliting = false;
    // @ts-ignore
    this.deleteId = null;
  }

  deleteImage (imageId: number) {
    this.isDeliting = true;
    this.appDataService.deleteCarImage(imageId).subscribe(i => {
      this.cancelDelete();
      this.imageToShow = null;
    }, error => {
      this.deleteError = error;
      this.isDeliting = false;
    })
  }

  setViewDeleteButtonsClass () {
    if (this.viewDeleteButtons) {
      this.viewDeleteButtonsClass = 'buttons visible';
    } else {
      this.viewDeleteButtonsClass = 'buttons';
    }
  }

  setImageClass () {
    if (this.imageId === this.mainImageId) {
      this.imageClass = 'image mainImage';
      this.isMainImage = true;
    } else {
      this.imageClass = 'image'
      this.isMainImage = false;
    }
  }

  onSetAsMainImage () {
   this.setAsMainImage.emit(this.imageId);
  }

  ngOnChanges() {
    this.setImageClass();
  }
}
