import { Component, OnInit } from '@angular/core';
import {Car} from '../../services/car-interface';
import {Router} from '@angular/router';
import {AppDataService} from '../../services/app-data.service';

@Component({
  selector: 'app-car-maint',
  templateUrl: './car-maint.component.html',
  styleUrls: ['./car-maint.component.css']
})
export class CarMaintComponent implements OnInit {
  // @ts-ignore
  CarList: Array<Car>;
  // @ts-ignore
  deleteError: string;
  // @ts-ignore
  deleteId: number;
  isDeliting = false;
  constructor(public router: Router, public appDataService: AppDataService) {
    appDataService.getCars().subscribe((data) => {this.CarList = data; });
  }

  ngOnInit(): void {
  }

  createCar(): void {
    this.router.navigate(['/authenticated/car-detail', 0, 'create']);
  }
  showCarDetail(id: number): void {
    this.router.navigate(['/authenticated/car-detail', id, 'details']);
  }
  editCar(id: number): void {
    this.router.navigate(['/authenticated/car-detail', id, 'edit']);
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
  deleteCar(id: number): void {
    this.isDeliting = true;
    this.appDataService.deleteCar(id).subscribe(c => {
      this.cancelDelete();
      this.CarList = this.CarList.filter(carItem => carItem.id !== id);
      },
      error => {
        this.deleteError = error;
        this.isDeliting = false;
      });
  }

}
