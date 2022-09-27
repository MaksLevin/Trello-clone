import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private db: AngularFirestore) {}

  setCollection(collect: string, path: string, setElement: object): void {
    this.db.collection(collect).doc(path).set(setElement);
  }

  getFromCollection(collect: string, getElementByUid: string): Observable<any> {
    return this.db.doc(collect + getElementByUid).valueChanges();
  }

  getMainBoardFromCollection(authUserUid: string): Observable<any> {
    const collectionRef = this.db.collection<any>(`mainBoards`, (ref) => {
      let refBuilder;
      refBuilder = ref.where('userUid', '==', authUserUid);
      return refBuilder;
    });

    return collectionRef.valueChanges({ idField: 'userUid' });
  }

  createId(): string {
    return this.db.createId()
  }
}
