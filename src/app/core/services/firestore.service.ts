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

  getFromCollectionByProperty<T>(
    collection: string,
    field: string,
    value: string
  ): Observable<T[]> {
    const collectionRef = this.angularFirestore.collection<T>(collection, (ref) => {
      let refBuilder;
      refBuilder = ref.where(field, '==', value);
      return refBuilder;
    });

    return collectionRef.valueChanges({ idField: field });
  }

  updateDocumentField(
    collection: string,
    mainBoardId: string,
    documentField: string,
    documentFieldValue: string | undefined
  ): Promise<void> {
    {
      return this.angularFirestore
        .collection(collection)
        .doc(mainBoardId)
        .update({ [documentField]: documentFieldValue });
    }
  }

  deleteDocument(collection: string, documentId: string): Promise<void> {
    return this.angularFirestore.collection(collection).doc(documentId).delete();
  }

  createId(): string {
    return this.angularFirestore.createId();
  }
}
