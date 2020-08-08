import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
// @ts-ignore
import {User} from '../../shared/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userData: User = {};

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {

  }

  saveData() {
    // tslint:disable-next-line:max-line-length
    if (this.userData.firstname === undefined || this.userData.lastname === undefined || this.userData.age === undefined || this.userData.email === undefined || this.userData.telephone === undefined) {
      this.userData.status = 'doing';
    } else {
      this.userData.status = 'complete';
    }

    this.userData.createBy = 'Administrator';
    this.userData.createDate = new Date();
    this.firebaseService.createData(this.userData).then(() => {
      console.log('create complete');
    });
  }
}
