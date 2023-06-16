import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './models/student.model';
import { Group } from '../group/models/group.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from '../files/files.module';
import { GroupModule } from '../group/group.module';
import { StudentTest } from '../student-test/models/student-test.model';

@Module({
  imports:[SequelizeModule.forFeature([Student, Group, StudentTest]),
  JwtModule.register({
    
  }),
  FilesModule,
  GroupModule
],
  controllers: [StudentController],
  providers: [StudentService],
  exports:[StudentService]
})
export class StudentModule {}
