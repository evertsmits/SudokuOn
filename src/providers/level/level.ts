import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the XpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LevelProvider {
	data: any;
  constructor(public http: Http) {
    console.log('Hello XpProvider Provider');
    this.data = 0;
  }

  getData(){
  	console.warn("getting die data");
  	this.data = JSON.parse(localStorage.getItem('level'));
  	if(this.data == null){
  		return 0;
  	}else{
  		return this.data;
  	}
  }

  setData(level){
  	console.warn("setting die data");
  	this.data = level;
  	localStorage.setItem('level', JSON.stringify(this.data));
  }

}