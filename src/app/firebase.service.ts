import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
// @ts-ignore
import {User} from './shared/user';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFirestore) {
  }

  // firebase ไม่ save ทับถ้า doc ชื่อซ้ำกัน
  createData(data: User) {
    return new Promise<any>((resolve, reject) => {
      this.firebase
        .collection('user-information')
        .doc(data.firstname)
        .set(data)
        .then(res => {
          console.log(res);
        }, err => reject(err));
    });
  }

}
