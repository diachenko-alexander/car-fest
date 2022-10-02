import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../../services/car-interface';
import {visibility} from '../../../spa/services/animations';
import {AppDataService} from '../../services/app-data.service';

@Component({
  selector: 'app-car-panel',
  templateUrl: './car-panel.component.html',
  styleUrls: ['./car-panel.component.css'],
  animations: [visibility]
})
export class CarPanelComponent implements OnInit {

  @Input() car!: Car;
  @Input() index = 1;
  isImageLoading = false;
  imageToShow: any;
  noMainImage: boolean;

  constructor(public appDataService: AppDataService) { }

  ngOnInit(): void {
    this.getMainImage();
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

  getMainImage () {
    this.appDataService.getMainImageId(this.car.id).subscribe(data => {
      if (data == -1) {
        this.noMainImage = true;
      } else {
        this.getImageFromService(data);
        this.noMainImage = false;
      }
    }, error => {
      console.error(error);
    })
  }

}
