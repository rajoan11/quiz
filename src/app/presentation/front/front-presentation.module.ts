import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../contrainte/config/shared/shared.module';
import { FrontRootComponent } from './front-root/front-root.component';
import { FrontRoutingModule } from '../../contrainte/config/front/front-routing.module';
import { QuizzResponseComponent } from './quizz-response/quizz-response.component';
import { FrontImageComponent } from './front-image/front-image.component';
import { FrontVideoComponent } from './front-video/front-video.component';
import { FrontEmbedComponent } from './front-embed/front-embed.component';
import { FrontTextComponent } from './front-text/front-text.component';
import { FrontMultipleChoiceComponent } from './front-multiple-choice/front-multiple-choice.component';
import { FrontCheckboxComponent } from './front-checkbox/front-checkbox.component';
import { FrontShortAnswerComponent } from './front-short-answer/front-short-answer.component';
import { FrontLongAnswerComponent } from './front-long-answer/front-long-answer.component';
import { FrontLinearScalComponent } from './front-linear-scal/front-linear-scal.component';
import { FrontDateComponent } from './front-date/front-date.component';
import { FrontHourComponent } from './front-hour/front-hour.component';
import { FrontListScrollComponent } from './front-list-scroll/front-list-scroll.component';

@NgModule({
  imports: [CommonModule, FrontRoutingModule, SharedModule],
  declarations: [FrontRootComponent, QuizzResponseComponent, FrontImageComponent, FrontVideoComponent, FrontEmbedComponent, FrontTextComponent, FrontMultipleChoiceComponent, FrontCheckboxComponent, FrontShortAnswerComponent, FrontLongAnswerComponent, FrontLinearScalComponent, FrontDateComponent, FrontHourComponent, FrontListScrollComponent]
})
export class FrontPresentationModule {}
