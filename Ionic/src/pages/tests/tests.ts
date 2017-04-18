import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import {QuestionnaireService} from "../../services/questionnaire.service";

/**
 * Generated class for the Tests page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {
  public topicsAndQuestions: Promise<Array<Object>>;
  public thematicName: Promise<String>;
  public id: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private platform: Platform,
              private questionnaireService: QuestionnaireService) {
    console.log('TestsPage Constructor called');
    this.id = navParams.get('id');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter Tests');
    this.thematicName = this.questionnaireService.getThematicName(this.id);
    this.topicsAndQuestions = this.questionnaireService.getThematicTopicsAndQuestions(this.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tests');
  }

}
