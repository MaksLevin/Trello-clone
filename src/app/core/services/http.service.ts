import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, firstValueFrom } from 'rxjs';

import { databasePath } from '@app/core/constants';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  async setCollection(collection: string, setElement: object): Promise<void> {
    await firstValueFrom(this.http.post(`${databasePath}${collection}`, setElement));
  }

  getCollection<T>(collection: string): Observable<T[]> {
    return this.http.get<T[]>(`${databasePath}${collection}`);
  }

  getFromCollectionByProperty<T>(
    collection: string,
    field: string,
    value: string
  ): Observable<T[]> {
    return this.http
      .get<T[]>(`${databasePath}${collection}`)
      .pipe(
        map((dataArray) =>
          dataArray.filter((dataObject: any) => dataObject[field as string] === value)
        )
      );
  }

  async updateDocumentField(
    collection: string,
    documentId: string,
    documentField: string,
    documentFieldValue: string | undefined
  ): Promise<void> {
    await firstValueFrom(
      this.http.patch(`${databasePath}${collection}/${documentId}`, {
        [documentField]: documentFieldValue,
      })
    );
  }

  async deleteDocument(collection: string, documentId: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${databasePath}${collection}/` + documentId));
  }

  createId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
