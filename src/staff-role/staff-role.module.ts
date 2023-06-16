import { Module, forwardRef } from '@nestjs/common';
import { StaffRoleService } from './staff-role.service';
import { StaffRoleController } from './staff-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '../role/models/role.model';
import { JwtModule } from '@nestjs/jwt';
import { StaffRole } from './models/staff-role.model';
import { Staff } from '../staff/models/staff.model';
import { StaffModule } from '../staff/staff.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports:[SequelizeModule.forFeature([Role, StaffRole, Staff]),
  JwtModule.register({
    
  }),
  forwardRef(()=>StaffModule),
  RoleModule
],
  controllers: [StaffRoleController],
  providers: [StaffRoleService],
  exports:[StaffRoleService]
})
export class StaffRoleModule {}
