import { Module, forwardRef } from '@nestjs/common';
import { StudentTestAnswerService } from './student-test-answer.service';
import { StudentTestAnswerController } from './student-test-answer.controller';
import { StudentTestAnswer } from './models/student-test-answer.model';
import { StudentTest } from '../student-test/models/student-test.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from '../question/models/question.model';
import { Answer } from '../answer/models/answer.model';
import { JwtModule } from '@nestjs/jwt';
import { StudentTestModule } from '../student-test/student-test.module';
import { QuestionModule } from '../question/question.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports:[SequelizeModule.forFeature([StudentTest, StudentTestAnswer, Question, Answer]),
  JwtModule.register({
    
  }),
  QuestionModule,
  AnswerModule,
  StudentTestModule
],
  controllers: [StudentTestAnswerController],
  providers: [StudentTestAnswerService],
  exports:[StudentTestAnswerService]
})
export class StudentTestAnswerModule {}
