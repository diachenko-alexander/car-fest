import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AppDataService} from '../../services/app-data.service';
import {CarImagesInterface} from '../../../spa/interfaces/CarImages.interface';
import {element} from 'protractor';

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.css']
})
export class ViewImagesComponent implements OnInit {
imageToShow: Array<CarImagesInterface> = [];
isImageLoading = false;
@Input() carId: number;
@Input() viewDeleteButtons: boolean;
showButtons: boolean;
carImagesIds: Array<number>;
isDeliting = false;
deleteId: number;
deleteError: string;
showButtonsClass: string = 'buttonsHide';


  constructor(public appDataService: AppDataService, private elementRef:ElementRef) {

  }

  ngOnInit(): void {
    this.loadImages();
  }

  createImageFromBlob(imageId: number, image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow.push({imageId: imageId, imageData: reader.result});
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

  loadImages () {
    this.appDataService.getCarImagesIds(this.carId).subscribe(data => {
      this.carImagesIds = data;
      this.carImagesIds.forEach(imageId => {
        this.getImageFromService(imageId);
      })
    }, error => {
      console.error(error);
    })
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
      this.imageToShow = this.imageToShow.filter(imageItem => imageItem.imageId !== imageId);
    }, error => {
      this.deleteError = error;
      this.isDeliting = false;
    })
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.querySelector('.imageCards')
      .addEventListener('mouseup', (e: any) => {
        // console.log(e);
        // console.log(e.target.nodeName);
        if (e.target.nodeName === 'IMG') {
          const elementId = e.target.parentElement.id;
          const selector = '#' + elementId + '> div.buttons';
          console.log(selector);
          this.elementRef.nativeElement.querySelector(selector)
            .classList.toggle('visible');

        }
        // console.log(e.target.parentElement.id);
        // this.showButtonsClass = 'buttonsShow';
      });

    // this.elementRef.nativeElement.querySelector('.imageCards')
    //   .addEventListener('mouseout', (e: any) => {
    //     const selector = 'div.buttons';
    //     this.elementRef.nativeElement.querySelector(selector)
    //       .classList.toggle('visible');
    //   });
  }



}
