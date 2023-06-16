import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StaffGroup } from './models/staff-group.model';
import { StaffService } from '../staff/staff.service';
import { GroupService } from '../group/group.service';

@Injectable()
export class StaffGroupService {

  constructor(
    @InjectModel(StaffGroup) private readonly staffGroupRepo: typeof StaffGroup,
    private readonly staffService: StaffService,
    private readonly groupService: GroupService
    ){}
    
  async create(createStaffGroupDto: CreateStaffGroupDto) {
    const staff =await this.staffService.findOne(createStaffGroupDto.staff_id);

    if(!staff){
      throw new HttpException("Staff not found", HttpStatus.NOT_FOUND)
    }

    const group = await this.groupService.findOne(createStaffGroupDto.group_id);
    if(!group){
      throw new HttpException("Group not found", HttpStatus.NOT_FOUND)
    }

    const StaffGroup = await this.findStaffGroup(createStaffGroupDto);
    
    if(StaffGroup){
      throw new BadRequestException("this staff already has this group")
    }
    return this.staffGroupRepo.create(createStaffGroupDto);
  }

  findStaffGroup(createStaffGroupDto: CreateStaffGroupDto) {
    const {staff_id, group_id} = createStaffGroupDto
    return this.staffGroupRepo.findOne({where:{staff_id, group_id},include:{all:true, nested:true}});
  }

  findAll() {
    return this.staffGroupRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.staffGroupRepo.findByPk(id, {include:{all:true, nested:true}});
  }


  remove(id: number) {
    return this.staffGroupRepo.destroy({where:{id}});
  }
}
