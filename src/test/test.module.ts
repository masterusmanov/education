import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { Test } from './models/test.model';
import { Subject } from '../subject/models/subject.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { SubjectModule } from '../subject/subject.module';
import { StudentTest } from '../student-test/models/student-test.model';

@Module({
  imports:[SequelizeModule.forFeature([Subject, Test, StudentTest]),
  JwtModule.register({
    
  }),
  SubjectModule
],
  controllers: [TestController],
  providers: [TestService],
  exports:[TestService]
})
export class TestModule {}
