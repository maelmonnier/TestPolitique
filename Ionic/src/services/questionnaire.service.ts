/**
 * Created by Mael on 16/04/2017.
 */
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import {Http, Response} from "@angular/http";

@Injectable()
export class QuestionnaireService {
  private _db;
  private  dbInitialized = false;
  private _candidates: Array<Object>;
  private dbname = "testpolitique.db";
  private sourceFile;
  private targetDir;
  private copyDbAgain = false;

  constructor(private file:File, private http: Http) {
    this._candidates = [];
  }

  openDB() {
    console.log("OpenDB");
    let openparams = {
      name: this.dbname,
      location: 'default'
    };
    this._db = window['sqlitePlugin'].openDatabase(openparams);
    this.dbInitialized = true;
    console.log("OpenDB / Dbinitialized");
  }

  copyDB() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log("CopyDB");
      let sourceFileName = this.file.applicationDirectory + 'www/' + this.dbname;
      let targetDirName = this.file.dataDirectory;

      Promise.all([
        this.file.resolveLocalFilesystemUrl(sourceFileName),
        this.file.resolveLocalFilesystemUrl(targetDirName)
      ]).then((files) => {
        this.sourceFile = files[0];
        this.targetDir = files[1];
        new Promise((resolve, reject) => {
          this.targetDir.getFile(this.dbname, {}, resolve, reject);
        }).then(() => {
          console.log("file already copied");


          new Promise((resolve, reject) => {
            this.sourceFile.copyTo(this.targetDir, this.dbname, resolve, reject);
          }).then(() => {
            console.log("database file copied again");
            this.openDB();
            resolve(true);
          });

        }).catch(() => {
          console.log("file doesn't exist, copying it");
          new Promise((resolve, reject) => {
            this.sourceFile.copyTo(this.targetDir, this.dbname, resolve, reject);
          }).then(() => {
            console.log("database file copied");
            this.openDB();
            resolve(true);
          });
        });
      });
    });
  }

  initDB() : Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.dbInitialized) {
        console.log("InitDB : dbInitialized");
        resolve(true);
        console.log("InitDB : Promise resolved");
      }
      console.log("InitDB : db in initialization");
      if (window['sqlitePlugin']) {
        if (this.copyDbAgain) {
          console.log("InitDB : Copy of a fresh version of the database app file");
          this.copyDB().then(() => {
            console.log("InitDB : Promise resolved");
            resolve(true);
          })
        } else {
          let src = this.file.dataDirectory + this.dbname;
          this.file.resolveLocalFilesystemUrl(src)
            .then(
              () => {
                console.log("InitDB : Db already copied to local dir");
                this.copyDB().then(() => {
                  //this.openDB();
                  console.log("InitDB : Promise resolved");
                  resolve(true);
                })

              })
            .catch(
              () => {
                console.log("InitDB : Db will be copied to local dir");
                this.copyDB().then(() => {
                  //this.openDB();
                  console.log("InitDB : Promise resolved");
                  resolve(true);
                })
              });
        }
      } else {
        console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
        this._db = window.openDatabase(this.dbname, '1', 'database', 5 * 1024 * 1024);
        this.initWebSqlFromSQLFile().then((res) => {
            console.log("InitDB : Promise resolved");
            resolve(res);
          }
        );

      }

     // var msg;

      /*console.log("InitDB : Verfiying data");

      this._db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS CANDIDATES (id unique, name)');
        tx.executeSql('INSERT INTO CANDIDATES (id, name) VALUES (1, "foobar")');
        tx.executeSql('INSERT INTO CANDIDATES (id, name) VALUES (2, "logmsg")');
        msg = '<p>Log message created and row inserted.</p>';
        console.warn(msg);
      });*/



    });
  }

  initWebSqlFromSQLFile() : Promise<boolean> {
    return new Promise(resolve => {
      this.loadSQLFile().then((response) => {
        let queries = response.text().split(';\n');
        this.processQuery(this._db, 0, queries, this.dbname);
        resolve(true);
      })
    });
  }

  loadSQLFile() : Promise<Response> {
    return new Promise(resolve => {
      this.http.get('testpolitique.sql').subscribe(response => {
        resolve(response);
      });
    });
  }

  processQuery(db, i, queries, dbname) {
    db.transaction((query) => {
      for (let i = 0 ; i < queries.length - 1 ; i++) {
        query.executeSql(queries[i]);
        console.log("Done importing!");
      }
    }, (err) => {
      console.log("Query error in ", queries, err.message);
    });
  }


  getAllCandidates() : Promise<Array<Object>> {
    return new Promise((resolve,reject) => {

      this.initDB().then(() => {
        console.log("Database should be initialized");
        this._db.transaction((tx) => {
          tx.executeSql('SELECT * FROM CANDIDATES', [], (tx, results) => {
            var len = results.rows.length, i;
            console.warn("<p>Found rows: " + len + "</p>");

            for (i = 0; i < len; i++) {
              this._candidates.push({id: results.rows.item(i).id, name: results.rows.item(i).name});
              console.warn("<p><b>" + results.rows.item(i).name + "</b></p>");
            }
            resolve(this._candidates);
          }, null);
        })
      })
    });

  }

}
