import {Injectable} from '@angular/core';
import {ServiceFirebase} from './iservicefirebase.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Funcionario} from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends ServiceFirebase<Funcionario> {

  constructor(firestore: AngularFirestore) {
    super(Funcionario, firestore, 'funcionarios');
  }
}
