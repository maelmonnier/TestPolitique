import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {QuestionnaireService} from "../../services/questionnaire.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public candidates: Promise<Array<Object>>;
  //private _db;

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private zone: NgZone,
              private questionnaireService: QuestionnaireService) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log("Call of promise getAllCandidates");
      this.candidates = this.questionnaireService.getAllCandidates();
      /*this.questionnaireService.getAllCandidates()
        .then((res) => {
          this.candidates = res;
        console.log("End of promise" + res);
      })
        .catch((error) => {
          console.log(error);
        });*/
    });
  }

}
