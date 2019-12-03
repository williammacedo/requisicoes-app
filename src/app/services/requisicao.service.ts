import {Injectable} from '@angular/core';
import {ServiceFirebase} from './iservicefirebase.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Requisicao} from '../models/requisicao.model';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoService extends ServiceFirebase<Requisicao> {

  constructor(firestore: AngularFirestore) {
    super(Requisicao, firestore, 'requisicoes');
  }
}
