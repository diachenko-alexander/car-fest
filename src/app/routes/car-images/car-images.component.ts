import {Component, Input, OnInit} from '@angular/core';
import {AppDataService} from '../../services/app-data.service';


@Component({
  selector: 'app-car-images',
  templateUrl: './car-images.component.html',
  styleUrls: ['./car-images.component.css']
})
export class CarImagesComponent implements OnInit {

  carImagesIds: Array<number>;
  mainImageId: number;
  @Input() carId: number;
  @Input() viewDeleteButtons: boolean;

  constructor(public appDataService: AppDataService,) { }

  ngOnInit(): void {
    this.getMainImageId();
    this.getCarImagesIds();
  }

  getCarImagesIds () {
    this.appDataService.getCarImagesIds(this.carId).subscribe(data => {
      this.carImagesIds = data;
    }, error => {
      console.error(error);
    })
  }

  getMainImageId () {
    this.appDataService.getMainImageId(this.carId).subscribe(data => {
      this.mainImageId = data;
    }, error => {
      console.error(error);
    })
  }

  setAsMainImage (imageId: number) {
    this.appDataService.setMainImage(this.carId, imageId).subscribe(data => {
      this.mainImageId = data;
    }, error => {
      console.error(error);
    })
  }
}
