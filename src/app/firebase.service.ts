import {Injectable} from '@angular/core';
import {AngularFirestoreModule} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firebase: AngularFirestoreModule) {
  }
}
