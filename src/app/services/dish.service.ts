import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

import 'rxjs/add/operator/catch';


import { Observable } from 'rxjs/Observable';

import 'rxjs/add/Observable/of';

import 'rxjs/add/operator/delay';

import 'rxjs/add/operator/map';

@Injectable()
export class DishService {

    constructor(private http: Http, private ProcessHttpmsgService: ProcessHttpmsgService) { }


  getDishes(): Observable<Dish[]> {
    return this.http.get(baseURL + 'dishes')
                    .map(res => { return this.ProcessHttpmsgService.extractData(res); });
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(baseURL + 'dishes/'+ id)
                    .map(res => { return this.ProcessHttpmsgService.extractData(res); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseURL + 'dishes?featured=true')
                    .map(res => { return this.ProcessHttpmsgService.extractData(res)[0]; });
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id) });
  }
  
}
