import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
// @ts-ignore
import {User} from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: User = {};
  showError = false;

  constructor(private firebase: AngularFirestore) {
  }

  loadData(firstname: string) {
    return this.firebase.collection('user-information').doc(firstname).snapshotChanges();
  }

  // firebase ไม่ save ทับถ้า doc ชื่อซ้ำกัน
  createData(data: User) {
    return new Promise<any>((resolve, reject) => {
      data.createBy = 'Administrator';
      data.createDate = new Date();
      data.status = this.validateData(data);

      if (data.firstname !== '' && data.firstname !== undefined) {
        this.firebase
          .collection('user-information')
          .doc(data.firstname)
          .set(data)
          .then(res => {
            alert('create user data success.');
          }, err => reject(err));
      } else {
        this.showError = true;
      }
    });
  }

  resetForm() {
    this.userData = {
      firstname: '',
      lastname: '',
      age: '',
      email: '',
      telephone: ''
    };
    this.showError = false;
  }

  validateData(data: User): string {

    if (this.notUndefined(data) && this.notEmpty(data)) {
      return 'complete';
    } else {
      return 'doing';
    }
  }

  notUndefined(data: User): boolean {
    // tslint:disable-next-line:max-line-length
    if (data.firstname === undefined || data.lastname === undefined || data.age === undefined || data.email === undefined || data.telephone === undefined) {
      return false;
    } else {
      return true;
    }
  }

  notEmpty(data: User): boolean {
    // tslint:disable-next-line:max-line-length
    if (data.firstname === '' || data.lastname === '' || data.age === '' || data.email === '' || data.telephone === '') {
      return false;
    } else {
      return true;
    }
  }

}
