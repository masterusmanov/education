import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './models/role.model';
import { JwtModule } from '@nestjs/jwt';
import { StaffRole } from '../staff-role/models/staff-role.model';

@Module({
  imports:[SequelizeModule.forFeature([Role, StaffRole]),
  JwtModule.register({
    
  }),
],
  controllers: [RoleController],
  providers: [RoleService],
  exports:[RoleService]
})
export class RoleModule {}
