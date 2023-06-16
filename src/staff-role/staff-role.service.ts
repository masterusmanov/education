import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { StaffRole } from './models/staff-role.model';
import { InjectModel } from '@nestjs/sequelize';
import { StaffService } from '../staff/staff.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class StaffRoleService {

  constructor(
    @InjectModel(StaffRole) private readonly staffRoleRepo: typeof StaffRole,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => StaffService)) private readonly staffService: StaffService
    ){}

  async create(createStaffRoleDto: CreateStaffRoleDto) {

    const staff =await this.staffService.findOne(createStaffRoleDto.staff_id);

    if(!staff){
      throw new HttpException("Staff not found", HttpStatus.NOT_FOUND)
    }

    const role = await this.roleService.findOne(createStaffRoleDto.role_id);
    if(!role){
      throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
    }

    const StaffRole = await this.findStaffRole(createStaffRoleDto);
    
    if(StaffRole){
      throw new BadRequestException("this staff already has this role")
    }
    return this.staffRoleRepo.create(createStaffRoleDto);
  }

  findAll() {
    return this.staffRoleRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.staffRoleRepo.findByPk(id,{include:{all:true, nested:true}});
  }

  findStaffRole(createStaffRoleDto: CreateStaffRoleDto) {
    const {staff_id, role_id} = createStaffRoleDto
    return this.staffRoleRepo.findOne({where:{staff_id, role_id},include:{all:true, nested:true}});
  }


  remove(id: number) {
    return this.staffRoleRepo.destroy({where:{id}});
  }
}
