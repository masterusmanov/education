import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './models/role.model';

@Injectable()
export class RoleService {

  constructor(@InjectModel(Role) private readonly roleRepo: typeof Role){}

  async create(createRoleDto: CreateRoleDto) {
    const role = await  this.findOneByName(createRoleDto.name);
    if(role){
      throw new BadRequestException('this role already excists')
    }

    return this.roleRepo.create(createRoleDto);
  }

  findAll() {
    return this.roleRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.roleRepo.findByPk(id,{include:{all:true}});
  }

  findOneByName(name: string) {
    return this.roleRepo.findOne({where: {name}, include:{all:true}});
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepo.update(updateRoleDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.roleRepo.destroy({where:{id}});
  }
}
