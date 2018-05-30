import { Component, OnInit, Input } from '@angular/core';
import { QuizReadApplicatifServiceACI } from '../../../service-applicatif/quiz-admin';
import { RubricDto, Question } from '../../../donnee/quiz';
import { QuestionService } from '../../../commun/service/question.service';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {
  @Input() colorCss: string;
  image: {
    type: 'image';
    type_content: 'metaContent';
  };
  rubric = new RubricDto();
  panelOpenState: boolean;
  text: {
    type: 'text';
    type_content: 'metaContent';
  };
  transferData: Object = { id: 1, msg: 'Hello' };

  video: {
    type: 'video';
    type_content: 'metaContent';
  };

  questions = [];
  questions1 = [];
  questions2 = [];
  constructor(
    private quizReadApplicatifServiceACI: QuizReadApplicatifServiceACI,
    private questionService: QuestionService
  ) {}

  ngOnInit() {
    this.questionChange();
  }

  getQuestions(): void {
    this.quizReadApplicatifServiceACI.getQuestion().subscribe(res => {
      res.forEach(element => {
        let quest = new Question();
        quest = element;
        element.id < 9
          ? (quest.type_content = 'question')
          : (quest.type_content = 'metaContent');
        if (!this.questions.find(questio => questio.id === element.id)) {
          this.questions.push(quest);
        }
      });
      this.questions.sort((a, b) => a.id - b.id);
      this.questions1 = JSON.parse(
        JSON.stringify(this.questions.filter(q1 => q1.id < 9))
      );
      this.questions2 = JSON.parse(
        JSON.stringify(this.questions.filter(q1 => q1.id > 8))
      );
    });
  }

  questionChange(): void {
    console.log('here');
    this.questionService.getQuestionChange().subscribe(data => {
      if (data) {
        this.getQuestions();
      }
    });
  }
}
