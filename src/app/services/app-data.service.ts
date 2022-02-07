import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Car} from './car-interface';
import {Observable, of, throwError} from 'rxjs';
import {delay, map, catchError} from 'rxjs/operators';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class AppDataService {
  private CarCollection: Array<Car> = [
    {id: 1, name: 'Ford', model: 'Focus', price: 4500},
    {id: 2, name: 'Mazda', model: '626', price: 8000},
    {id: 3, name: 'Chery', model: 'QQ', price: 4000},
    {id: 4, name: 'Audi', model: 'A6', price: 15000},
    {id: 5, name: 'BMW', model: 'X5', price: 20000},
    {id: 6, name: 'Fiat', model: 'Doblo', price: 3000},
  ];

  private url = 'http://localhost:3000/cars';

  constructor(public userService: UserService, public http: HttpClient) {
  }

  getCars(): Observable<Car[]> {
    // return of(this.CarCollection);
    return this.http.get<Car[]>(this.url).pipe(map(response => {
      this.CarCollection = response;
      return this.CarCollection;
    }), catchError(() => throwError('Server error')));
  }

  getCar(id: number): Observable<Car> {
    // const car = this.CarCollection.find(item => item.id = id);
    // @ts-ignore
    // return of(car);
    return this.http.get<Car[]>(this.url).pipe(map(response => {
      return response.filter((itemCar: Car) => itemCar.id === id);
    }), catchError(() => throwError('Server error')));
  }

  deleteCar(id: number): Observable<any> {
    // return of({}).pipe(delay(2000), map(() => this.CarCollection.splice(this.CarCollection.findIndex(item => item.id = id), 1)));
    return this.http.delete(this.url + '/' + id).pipe(map((response) => {
      return response;
    }), delay(1200));
  }

  createCar(newCar: Car): Observable<any> {
    // let id = 0;
    // this.CarCollection.forEach(item => {
    //   if (item.id >= id) {
    //     id = item.id + 1;
    //   }
    // });
    // newCar.id = id;
    // this.CarCollection.push(newCar);
    // return of(newCar);
    return this.http.post(this.url, newCar).pipe(map((response) => {
      return response;
    }));
  }

  updateCar(CarForUpdating: Car): Observable<any> {
    // const car = this.CarCollection.find(item => item.id === CarForUpdating.id);
    // Object.assign(car, CarForUpdating);
    // return of(car).pipe(delay(1200));
    return this.http.put(this.url + '/' + CarForUpdating.id, CarForUpdating).pipe(map((response) => {
      return response;
    }), delay(1000));
  }
}
