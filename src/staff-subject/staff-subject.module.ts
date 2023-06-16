import { Module } from '@nestjs/common';
import { StaffSubjectService } from './staff-subject.service';
import { StaffSubjectController } from './staff-subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StaffSubject } from './models/staff-subject.model';
import { Staff } from '../staff/models/staff.model';
import { Subject } from '../subject/models/subject.model';
import { JwtModule } from '@nestjs/jwt';
import { StaffModule } from '../staff/staff.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports:[SequelizeModule.forFeature([ StaffSubject, Staff, Subject]),
  JwtModule.register({
    
  }),
  StaffModule,
  SubjectModule
],
  controllers: [StaffSubjectController],
  providers: [StaffSubjectService]
})
export class StaffSubjectModule {}
