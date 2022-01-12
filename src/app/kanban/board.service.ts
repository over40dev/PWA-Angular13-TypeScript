import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
// TODO: Remove need for Firebase v9 compat
// Firebase v9 compart
import firebase from "firebase/compat/app";
import { AngularFirestore } from "@angular/fire/compat/firestore";
// Firebase v9 modular code
// import { Firestore, collection, doc } from '@angular/fire/firestore';
import { switchMap, map } from "rxjs/operators";
import { Board, Task } from './board.model';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private readonly auth: Auth,
    private readonly db: AngularFirestore,
  ) { }

  /**
   * Creates a new board for the current user
   * @param data Type Board
   * @returns Promise<docRef>
   */
  async createBoard(data: Board) {
    const user = await this.auth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user?.uid,
      tasks: [
        {
          description: 'Hello',
          label: 'yellow'
        }
      ]
    });
  }

  /**
   * Delete Board
   * @param boardId : string
   */
  deleteBoard(boardId: string) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .delete();
  }

  /**
   * Updates the tasks on a board
   * @param boardId : string
   * @param tasks : Task[]
   * @returns 
   */
  updateTasks(boardId:string, tasks:Task[]) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({tasks})
  }

  /**
   * Remove a specific task from the board
   * @param boardId : string
   * @param task : Task
   * @returns 
   */
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /**
   * Get all boards owned by current user
   * @returns 
   */
  getUserBoards() {
    return authState(this.auth)
      .pipe(
        // user inside switchMap is currentUser
        switchMap(user => {
          if (user) {
            return this.db
              .collection<Board>('boards', ref => 
                ref.where('uid','==',user.uid)
                .orderBy('priority')
              )
              .valueChanges({idField: 'id'});
          } else {
            return [];
          }
        })
      );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   * @param boards : Board[]
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
    batch.commit();
  }

}
