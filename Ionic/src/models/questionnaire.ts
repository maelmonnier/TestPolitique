/**
 * Created by Mael on 14/04/2017.
 */
export class Candidate {
  id: number;
  name: string;
  party: string;
  constructor(theName: string) { this.name = theName; }
}
export class Thematic {
  id: number;
  name: string;
  constructor(theName: string) { this.name = theName; }
}
export class Subject {
  id: number;
  name: string;
  thematic: Thematic;
  constructor(theName: string) { this.name = theName; }
}
export class Question {
  id: number;
  text: string;
  subject: Subject;
  constructor(questionText: string) { this.text = questionText; }
}
