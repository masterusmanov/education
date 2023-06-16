import { Module, forwardRef } from '@nestjs/common';
import { StudentTestService } from './student-test.service';
import { StudentTestController } from './student-test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from '../student/models/student.model';
import { Test } from '../test/models/test.model';
import { JwtModule } from '@nestjs/jwt';
import { StudentModule } from '../student/student.module';
import { TestModule } from '../test/test.module';
import { StudentTest } from './models/student-test.model';
import { StudentTestAnswer } from '../student-test-answer/models/student-test-answer.model';
import { StudentTestAnswerModule } from '../student-test-answer/student-test-answer.module';

@Module({
  imports:[SequelizeModule.forFeature([Student, Test, StudentTest, StudentTestAnswer]),
  JwtModule.register({
    
  }),
  StudentModule,
  TestModule,

],
  controllers: [StudentTestController],
  providers: [StudentTestService],
  exports:[StudentTestService]
})
export class StudentTestModule {}
