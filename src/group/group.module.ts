import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { JwtModule } from '@nestjs/jwt';
import { StaffGroup } from '../staff-group/models/staff-group.model';
import { Student } from '../student/models/student.model';

@Module({
  imports:[SequelizeModule.forFeature([Group, StaffGroup, Student]),
  JwtModule.register({
    
  }),
],
  controllers: [GroupController],
  providers: [GroupService],
  exports:[GroupService]
})
export class GroupModule {}
