import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';



@Injectable()
export class ValidateService {

  user: any;


  constructor(
    private http: Http
  ) { }



  validateRegister(user) {

    if (user.firstname == undefined || user.lastname == undefined ||
       user.email == undefined || user.username == undefined ||
       user.password == undefined || user.firstname == "" || user.lastname == "" ||
          user.email == "" || user.username == "" ||
          user.password == "") {

      return false;

    } else {

      return true;

    }

  }

  validateEmail(email) {

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

  }

}
