import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subject } from './models/subject.model';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { StaffSubject } from '../staff-subject/models/staff-subject.model';

@Module({
  imports:[SequelizeModule.forFeature([Subject, StaffSubject]),
  JwtModule.register({
    
  }),
  FilesModule,
],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports:[SubjectService]
})
export class SubjectModule {}
