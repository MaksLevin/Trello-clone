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

  getMainBoardsFromCollection(authUserUid: string): Observable<any> {
    const collectionRef = this.db.collection<any>(`mainBoards`, (ref) => {
      let refBuilder;
      refBuilder = ref.where('userUid', '==', authUserUid);
      return refBuilder;
    });

    return collectionRef.valueChanges({ idField: 'userUid' });
  }

  updateMainBoard(
    collection: string,
    idMainBoard: string,
    title: string,
    description: string
  ) {
    {
      this.db
        .collection(collection)
        .doc(idMainBoard)
        .update({ title: title, description: description });
    }
  }

  deleteMainBoard(collection: string, idMainBoard: string) {
    this.db.collection(collection).doc(idMainBoard).delete();
  }

  createId(): string {
    return this.db.createId();
  }
}
