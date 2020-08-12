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

  listUser: User[];

  constructor(public firebaseService: FirebaseService, private toastrService: ToastrService) {
    this.firebaseService.loadData().subscribe(actionArray => {
      this.listUser = actionArray.map(item => {
        return {
          firstname: item.payload.doc.id,
          // @ts-ignore
          ...item.payload.doc.data()
        } as User;
      });
    });
  }

  rowSelected(selected: User) {
    selected.updateDate = new Date();
    this.firebaseService.userData = selected;
  }

  ngOnInit(): void {
  }
}
