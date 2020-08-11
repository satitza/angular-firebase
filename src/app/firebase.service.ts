import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
// @ts-ignore
import {User} from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: User = {};

  constructor(private firebase: AngularFirestore) {
  }

  loadData(firstname: string) {
    return this.firebase.collection('user-information').doc(firstname).snapshotChanges();
  }

  // firebase ไม่ save ทับถ้า doc ชื่อซ้ำกัน
  createData(data: User) {
    return new Promise<any>((resolve, reject) => {

      // tslint:disable-next-line:max-line-length
      if (data.firstname === undefined || data.lastname === undefined || data.age === undefined || data.email === undefined || data.telephone === undefined) {
        data.status = 'doing';
      } else {
        data.status = 'complete';
      }

      data.createBy = 'Administrator';
      data.createDate = new Date();
      this.firebase
        .collection('user-information')
        .doc(data.firstname)
        .set(data)
        .then(res => {
        }, err => reject(err));
    });
  }

}
