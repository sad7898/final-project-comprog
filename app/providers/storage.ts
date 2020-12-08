
import {Injectable} from '@angular/core';
import { Subject,Observable } from 'rxjs';

@Injectable()
export class Storage {
    private storageSubject = new Subject<String>()
    constructor(){}
    watchStorage(): Observable<any> {
        return this.storageSubject.asObservable();
      }
    
      setItem(key: string, data: any) {
        localStorage.setItem(key, data);
        this.storageSubject.next('changed');
      }
    
      removeItem(key) {
        localStorage.removeItem(key);
        this.storageSubject.next('changed');
      }
}