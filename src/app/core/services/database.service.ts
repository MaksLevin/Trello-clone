import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  setCollection(collection: string, path: string, setElement: object): void {
    this.db.collection(collection).doc(path).set(setElement);
  }

  getFromCollection(
    collection: string,
    getElementByUid: string
  ): Observable<unknown> {
    return this.db.doc(`${collection}${getElementByUid}`).valueChanges();
  }
}
