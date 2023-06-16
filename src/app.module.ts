import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffModule } from './staff/staff.module';
import { Staff } from './staff/models/staff.model';
import { RoleModule } from './role/role.module';
import { StaffRoleModule } from './staff-role/staff-role.module';
import { Role } from './role/models/role.model';
import { StaffRole } from './staff-role/models/staff-role.model';
import { SubjectModule } from './subject/subject.module';
import { StaffSubjectModule } from './staff-subject/staff-subject.module';
import { StaffSubject } from './staff-subject/models/staff-subject.model';
import { Subject } from './subject/models/subject.model';
import { GroupModule } from './group/group.module';
import { StaffGroupModule } from './staff-group/staff-group.module';
import { Group } from './group/models/group.model';
import { StaffGroup } from './staff-group/models/staff-group.model';
import { StudentModule } from './student/student.module';
import { Student } from './student/models/student.model';
import { TestModule } from './test/test.module';
import { Test } from './test/models/test.model';
import { QuestionModule } from './question/question.module';
import { Question } from './question/models/question.model';
import { AnswerModule } from './answer/answer.module';
import { Answer } from './answer/models/answer.model';
import { StudentTestModule } from './student-test/student-test.module';
import { StudentTest } from './student-test/models/student-test.model';
import { StudentTestAnswerModule } from './student-test-answer/student-test-answer.module';
import { StudentTestAnswer } from './student-test-answer/models/student-test-answer.model';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [Staff, Role, StaffRole, StaffSubject, Subject, Group, StaffGroup, Student, Test, Question, Answer, StudentTest, StudentTestAnswer],
      autoLoadModels: true,
      logging: false
  }),
    StaffModule,
    RoleModule,
    StaffRoleModule,
    SubjectModule,
    StaffSubjectModule,
    GroupModule,
    StaffGroupModule,
    StudentModule,
    TestModule,
    QuestionModule,
    AnswerModule,
    StudentTestModule,
    StudentTestAnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
