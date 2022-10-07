import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private angularFirestore: AngularFirestore) {}

  setCollection(collection: string, path: string, setElement: object): Promise<void> {
    return this.angularFirestore.collection(collection).doc(path).set(setElement);
  }

  getFromCollection<T>(collection: string, getElementByUid: string): Observable<T | undefined> {
    return this.angularFirestore
      .doc<T | undefined>(`${collection}${getElementByUid}`)
      .valueChanges();
  }

  getMainBoardsFromCollection<T>(authUserUid: string): Observable<T[]> {
    const collectionRef = this.angularFirestore.collection<T>(`mainBoards`, (ref) => {
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
    description: string | undefined
  ): Promise<void> {
    {
      return this.angularFirestore
        .collection(collection)
        .doc(idMainBoard)
        .update({ title: title, description: description });
    }
  }

  deleteMainBoard(collection: string, idMainBoard: string): Promise<void> {
    return this.angularFirestore.collection(collection).doc(idMainBoard).delete();
  }

  createId(): string {
    return this.angularFirestore.createId();
  }
}
