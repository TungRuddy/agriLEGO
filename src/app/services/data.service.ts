import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
 
@Injectable()
export class DataService {
    dataChange: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    addList(any){
        this.dataChange.next(any);
    }


}