import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  setCollection(collect: string, path: string, setElement: object) {
    this.db.collection(collect).doc(path).set(setElement);
  }

  getFromCollection(collect: string, getElementByUid: string) {
    return this.db.doc(collect + getElementByUid).valueChanges();
  }
}
