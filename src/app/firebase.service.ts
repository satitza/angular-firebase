import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
// @ts-ignore
import {User} from './shared/user';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  userData: User = {};
  showError = false;

  constructor(private firebase: AngularFirestore, private toastrService: ToastrService) {
  }

  loadData() {
    return this.firebase.collection('user-information').snapshotChanges();
  }

  // firebase ไม่ save ทับถ้า doc ชื่อซ้ำกัน
  createData(data: User) {
    return new Promise<any>((resolve, reject) => {
      data.createBy = 'Administrator';
      if (data.updateDate === undefined) {
        data.createDate = new Date().toISOString();
      }
      data.status = this.validateData(data);

      if (data.firstname !== '' && data.firstname !== undefined) {
        if (data.formId === undefined) {
          this.firebase
            .collection('user-information')
            /*.doc(data.firstname)*/
            .add(data)
            .then(res => {
              this.toastrService.success('Save', 'Create user data success.');
            }, err => reject(err));
        } else {
          this.firebase
            .collection('user-information')
            .doc(data.formId)
            .update(data)
            .then(res => {
              this.toastrService.success('Update', 'Update user data success.');
            }, err => reject(err));
        }
        this.resetForm();
      } else {
        this.toastrService.warning('Warring', 'Invalid first name');
        this.showError = true;
      }
    });
  }

  deleteData(id: string) {
    if (confirm('Confirm delete user')) {
      this.firebase.collection('user-information').doc(id).delete().then(() => {
        this.toastrService.success('Delete', 'Delete user success.');
        this.resetForm();
      });
    }
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
