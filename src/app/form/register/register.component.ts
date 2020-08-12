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

  listUser: User[];

  constructor(public firebaseService: FirebaseService) {
    this.initialData();
  }

  initialData() {
    this.firebaseService.loadData().subscribe(actionArray => {
      this.listUser = actionArray.map(item => {
        return {
          formId: item.payload.doc.id,
          // @ts-ignore
          ...item.payload.doc.data()
        } as User;
      });
    });
  }

  rowSelected(selected: User) {
    selected.updateDate = new Date().toISOString();
    this.firebaseService.userData = selected;
  }

  resetForm() {
    this.firebaseService.resetForm();
    this.initialData();
  }

  ngOnInit(): void {
  }
}
