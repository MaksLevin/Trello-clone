import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  setCollection(collection: string, path: string, setElement: object): void {
    this.db.collection(collection).doc(path).set(setElement);
  }

  getFromCollection<T>(
    collection: string,
    getElementByUid: string
  ): Observable<T> {
    return this.db
      .doc(`${collection}${getElementByUid}`)
      .valueChanges() as Observable<T>;
  }
}
