import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { QuestionModule } from '../question/question.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './models/answer.model';
import { Question } from '../question/models/question.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Question, Answer]),
  JwtModule.register({
    
  }),
  QuestionModule
],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports:[AnswerService]
})
export class AnswerModule {}
