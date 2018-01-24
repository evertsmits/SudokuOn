import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the XpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class XpProvider {
	data: any;
  constructor(public http: Http) {
    console.log('Hello XpProvider Provider');
    this.data = 0;
  }

  getData(){
  	console.warn("getting die data");
  	this.data = JSON.parse(localStorage.getItem('xp'));
  	if(this.data == null){
  		return 0;
  	}else{
  		return this.data;
  	}
  }

  setData(xp){
  	console.warn("setting die data");
  	this.data = xp;
  	localStorage.setItem('xp', JSON.stringify(this.data));
  }

}
