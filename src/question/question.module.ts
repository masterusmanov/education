import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '../test/models/test.model';
import { TestModule } from '../test/test.module';
import { Answer } from '../answer/models/answer.model';

@Module({
  imports:[SequelizeModule.forFeature([Test, Question, Answer]),
  JwtModule.register({
    
  }),
  TestModule
],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports:[QuestionService]
})
export class QuestionModule {}
