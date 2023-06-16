import { Module } from '@nestjs/common';
import { StaffGroupService } from './staff-group.service';
import { StaffGroupController } from './staff-group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from '../staff/models/staff.model';
import { Group } from '../group/models/group.model';
import { StaffGroup } from './models/staff-group.model';
import { JwtModule } from '@nestjs/jwt';
import { GroupModule } from '../group/group.module';
import { StaffModule } from '../staff/staff.module';

@Module({
  imports:[SequelizeModule.forFeature([Staff, Group, StaffGroup]),
  JwtModule.register({
    
  }),
  StaffModule,
  GroupModule
],
  controllers: [StaffGroupController],
  providers: [StaffGroupService]
})
export class StaffGroupModule {}
