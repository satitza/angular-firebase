import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../firebase.service';
// @ts-ignore
import {User} from '../../shared/user';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ToastrService]
})
export class RegisterComponent implements OnInit {

  constructor(public firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
  }
}
