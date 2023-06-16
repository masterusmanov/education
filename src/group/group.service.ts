import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';

@Injectable()
export class GroupService {

  constructor(
    @InjectModel(Group) private groupRepo: typeof Group,
    ){}

  async create(createGroupDto: CreateGroupDto) {
    const group = await this.findOneByName(createGroupDto.name.toLowerCase());
    if(group){
      throw new BadRequestException("this group name already excists")
    }

    return this.groupRepo.create({name:createGroupDto.name.toLowerCase(), start_year: createGroupDto.start_year});
  }

  findAll() {
    return this.groupRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.groupRepo.findByPk(id, {include:{all:true, nested:true}});
  }


  findOneByName(name: string) {
    return this.groupRepo.findOne({where:{name}, include:{all:true, nested:true}});
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    if(updateGroupDto.name){
      const group = await this.findOneByName(updateGroupDto.name.toLowerCase());
      const self = await this.findOne(id);
      if(group && self.name !== updateGroupDto.name){
        throw new BadRequestException("this group name already excists")
      }
    }
    return this.groupRepo.update(updateGroupDto,{where:{id}, returning:true});
  }

  remove(id: number) {
    return this.groupRepo.destroy({where:{id}});
  }
}
