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

  constructor(public firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
  }
}
