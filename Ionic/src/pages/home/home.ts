import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {QuestionnaireService} from "../../services/questionnaire.service";
import {TestsPage} from "../tests/tests";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public candidates: Promise<Array<Object>>;

  constructor(public navCtrl: NavController,
              private platform: Platform,
              private questionnaireService: QuestionnaireService) {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      console.log("Call of promise getAllCandidates");
      this.candidates = this.questionnaireService.getAllCandidates();
    });
  }

  testPage() {
    // push another page onto the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.navCtrl.push(TestsPage, {
      id: 1
    });
  }

}
