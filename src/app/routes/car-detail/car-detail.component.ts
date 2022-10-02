import {Component, OnInit} from '@angular/core';
import {FieldInput} from '../../../spa/dynamicForms/field-interface';
import {Car} from '../../services/car-interface';
import {AppDataService} from '../../services/app-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {visibility} from '../../../spa/services/animations';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
  animations: [visibility]
})
export class CarDetailComponent implements OnInit {
  // @ts-ignore
  car: Car;
  carDefinitionInput: Array<FieldInput> = [
    {key: 'id', type: 'number', isId: true, label: 'Id', required: true},
    {key: 'name', type: 'string', isId: false, label: 'Car name', required: true},
    {key: 'model', type: 'string', isId: false, label: 'Car model', required: true},
    {key: 'price', type: 'number', isId: false, label: 'Car price value', required: false},
  ];
  // @ts-ignore
  operation: string; //edit/ read/ create
  // @ts-ignore
  errorMessage: string;
  carId = +this.route.snapshot.params.id;
  uploadImage: boolean;
  viewImages: boolean;
  viewDeleteButtons: boolean;

  constructor(public router: Router, public route: ActivatedRoute, public appDataService: AppDataService) {
  }

  ngOnInit(): void {
    this.operation = this.route.snapshot.params.operation;
    if (this.operation === 'create') {
      // @ts-ignore
      this.car = {id: 0, name: '', price: null};
      this.uploadImage = false;
      this.viewImages = false;
      this.viewDeleteButtons = false;
    } else if (this.operation === 'edit') {
      // @ts-ignore
      this.appDataService.getCar(+this.route.snapshot.params.id).subscribe((car: Car) => this.car = car);
      this.uploadImage = true;
      this.viewImages = true;
      this.viewDeleteButtons = true;
    } else if (this.operation === 'details'){
      this.appDataService.getCar(+this.route.snapshot.params.id).subscribe((car: Car) => this.car = car);
      this.uploadImage = false;
      this.viewImages = true;
      this.viewDeleteButtons = false;
    }
  }
  createCar(car: Car): void {
    car.id = 0;
    // @ts-ignore
    this.errorMessage = null;
    this.appDataService.createCar(car).subscribe(
      c => this.router.navigate(['/authenticated/car-maint']),
      error => this.errorMessage = 'Error creating car');
  }

  updateCar(car: Car): void {
    // @ts-ignore
    this.errorMessage = null;
    this.appDataService.updateCar(car).subscribe(
      c => this.router.navigate(['/authenticated/car-maint']),
      error => this.errorMessage = 'Error updating car'
    );
  }

}
