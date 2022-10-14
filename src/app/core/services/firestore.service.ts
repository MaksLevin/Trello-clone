import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
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

  updateMainBoardTitle(
    collection: string,
    mainBoardId: string,
    title: string,
    titleValue: string | undefined
  ): Promise<void> {
    {
      return this.angularFirestore
        .collection(collection)
        .doc(mainBoardId)
        .update({ [title]: titleValue });
    }
  }

  updateMainBoardDescription(
    collection: string,
    mainBoardId: string,
    description: string,
    descriptionValue: string | undefined
  ): Promise<void> {
    {
      return this.angularFirestore
        .collection(collection)
        .doc(mainBoardId)
        .update({ [description]: descriptionValue });
    }
  }

  deleteMainBoard(collection: string, idMainBoard: string): Promise<void> {
    return this.angularFirestore.collection(collection).doc(idMainBoard).delete();
  }

  createId(): string {
    return this.angularFirestore.createId();
  }
}
