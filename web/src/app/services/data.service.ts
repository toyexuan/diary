import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BroadcastDataModel } from '../lib/types/data.types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _messageSource = new BehaviorSubject<BroadcastDataModel<any>>({
    type: null,
    payload: null
  });
  private _storage: Array<{
    type: string;
    data: any;
  }> = [];

  constructor() {}

  public currentMessage<T>() {
    return (this._messageSource as BehaviorSubject<
      BroadcastDataModel<T>
    >).asObservable();
  }

  public sendMessage<T>(message: BroadcastDataModel<T>) {
    this._messageSource.next(message);
  }

  public get Storage() {
    return {
      get: <T>(typeName: string) => {
        const resource = this._storage.find(s => s.type === typeName);
        return resource ? (resource.data as T) : null;
      },
      setItem: <T>(typeName: string, data: T) => {
        this._storage.push({
          type: typeName,
          data
        });
      },
      update: <T>(
        typeName: string,
        updateFunc: (oldValue: T) => T
      ): {
        type: string;
        data: T;
      } => {
        const store = this._storage.find(s => s.type === typeName);
        if (store) {
          store.data = updateFunc(store.data);
        }
        return store;
      },
      remove: <T>(
        typeName: string
      ): {
        type: string;
        data: T;
      }[] => {
        const index = this._storage.findIndex(s => s.type === typeName);
        if (index < 0) {
          return null;
        } else {
          return this._storage.splice(index, 1);
        }
      },
      clear: () => {
        this._storage = [];
      }
    };
  }
}
