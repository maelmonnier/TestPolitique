/**
 * Created by Mael on 16/04/2017.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class QuestionnaireService {
  private _db;
  private _candidates: Array<Object>;

  initDB() {
    if (window['sqlitePlugin']) {
      let openparams = {
        name: "test.db",
        location: 2, // local backup
        createFromLocation: 0
      };
      this._db = window['sqlitePlugin'].openDatabase(openparams);
    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
      this._db = window.openDatabase("test.db", '1.0', 'database', 5 * 1024 * 1024);
    }

    var msg;

    this._db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS CANDIDATES (id unique, name)');
      tx.executeSql('INSERT INTO CANDIDATES (id, name) VALUES (1, "foobar")');
      tx.executeSql('INSERT INTO CANDIDATES (id, name) VALUES (2, "logmsg")');
      msg = '<p>Log message created and row inserted.</p>';
      console.warn(msg);
    });

    this._candidates = [];
  }

  getAllCandidates() : Promise<Array<Object>> {
    return new Promise((resolve,reject) => {

      this._db.transaction((tx) => {
        tx.executeSql('SELECT * FROM CANDIDATES', [], (tx, results) => {
          var len = results.rows.length, i;
          console.warn("<p>Found rows: " + len + "</p>");

          for (i = 0; i < len; i++){
            this._candidates.push({id: results.rows.item(i).id, name: results.rows.item(i).name});
            console.warn("<p><b>" + results.rows.item(i).name + "</b></p>");
          }
          resolve(this._candidates);
        }, null);
      });

    });

  }

}
