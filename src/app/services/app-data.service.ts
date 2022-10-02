import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Car} from './car-interface';
import {Observable, of, throwError} from 'rxjs';
import {delay, map, catchError} from 'rxjs/operators';
import {HttpClient, HttpEvent, HttpResponse, HttpRequest, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AppDataService {
  private CarCollection: Array<Car> = [];

  private url = 'https://localhost:5001/api/';
  private carsPrefix = 'Cars';
  private imagePrefix = 'Images';

  constructor(public userService: UserService, public http: HttpClient) {
  }

  getCars(): Observable<Car[]> {
    // return of(this.CarCollection);
    return this.http.get<Car[]>(this.url + this.carsPrefix).pipe(map(response => {
      this.CarCollection = response;
      return this.CarCollection;
    }), catchError(() => throwError('Server error')));
  }

  getCar(id: number): Observable<Car> {
    // @ts-ignore
    return this.http.get<Car[]>(this.url + this.carsPrefix + '/' + id).pipe(map(response => {
      return response;
    }), catchError(() => throwError('Server error')));
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(this.url + this.carsPrefix + '/' + id).pipe(map((response) => {
      return response;
    }));
  }

  createCar(newCar: Car): Observable<any> {
    return this.http.post(this.url + this.carsPrefix, newCar).pipe(map((response) => {
      return response;
    }));
  }

  updateCar(CarForUpdating: Car): Observable<any> {
    return this.http.put(this.url + this.carsPrefix + '/' + CarForUpdating.id, CarForUpdating).pipe(map((response) => {
      return response;
    }));
  }

  uploadImage (file: File, carId: number): Observable<HttpEvent<any>> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    formData.append('imageFile', file);
    formData.append('carId', carId.toString());
    const req = new HttpRequest('POST', `${this.url + this.imagePrefix + '/save-image'}`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: headers
    });
    return this.http.request(req);
  }

  getCarImage(imageId: number): Observable<Blob> {
    return this.http.get(`${this.url + this.imagePrefix}/get-image?imageId=${imageId}`, {responseType: 'blob'});
  }

  getCarImagesIds (carId: number): Observable<any> {
    return this.http.get(`${this.url + this.imagePrefix}/get-images-ids?carId=${carId}`);
  }

  deleteCarImage (imageId: number): Observable<any> {
    return this.http.delete(`${this.url + this.imagePrefix}/delete-image?imageId=${imageId}`);
  }

  getMainImageId (carId: number): Observable<any> {
    return this.http.get(`${this.url + this.imagePrefix}/get-main-image-id?carId=${carId}`);
  }

  setMainImage (carId: number, imageId: number): Observable<any> {
    return this.http.get(`${this.url + this.imagePrefix}/set-main-image?carId=${carId}&imageId=${imageId}`);
  }


// JSON DB LOGIC

  // private CarCollection: Array<Car> = [
  //   {id: 1, name: 'Ford', model: 'Focus', price: 4500},
  //   {id: 2, name: 'Mazda', model: '626', price: 8000},
  //   {id: 3, name: 'Chery', model: 'QQ', price: 4000},
  //   {id: 4, name: 'Audi', model: 'A6', price: 15000},
  //   {id: 5, name: 'BMW', model: 'X5', price: 20000},
  //   {id: 6, name: 'Fiat', model: 'Doblo', price: 3000},
  // ];
  // getCars(): Observable<Car[]> {
  //   // return of(this.CarCollection);
  //   return this.http.get<Car[]>(this.url).pipe(map(response => {
  //     this.CarCollection = response;
  //     return this.CarCollection;
  //   }), catchError(() => throwError('Server error')));
  // }

}
