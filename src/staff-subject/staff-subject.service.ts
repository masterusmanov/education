import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StaffSubject } from './models/staff-subject.model';
import { StaffService } from '../staff/staff.service';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class StaffSubjectService {

  constructor(
    @InjectModel(StaffSubject) private readonly staffSubjectRepo: typeof StaffSubject,
    private readonly staffService: StaffService,
    private readonly subjectService: SubjectService
    ){}

  async create(createStaffSubjectDto: CreateStaffSubjectDto) {

    const staff =await this.staffService.findOne(createStaffSubjectDto.staff_id);

    if(!staff){
      throw new HttpException("Staff not found", HttpStatus.NOT_FOUND)
    }

    const subject = await this.subjectService.findOne(createStaffSubjectDto.subject_id);
    if(!subject){
      throw new HttpException("Subject not found", HttpStatus.NOT_FOUND)
    }
    
    const StaffSubject = await this.findStaffSubject(createStaffSubjectDto);
    
    if(StaffSubject){
      throw new BadRequestException("this staff already has this subject")
    }

    return this.staffSubjectRepo.create(createStaffSubjectDto);
  }

  findAll() {
    return this.staffSubjectRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.staffSubjectRepo.findByPk(id,{include:{all:true, nested:true}});
  }

  findStaffSubject(createStaffSubjectDto: CreateStaffSubjectDto) {
    const {staff_id, subject_id} = createStaffSubjectDto
    return this.staffSubjectRepo.findOne({where:{staff_id, subject_id},include:{all:true, nested:true}});
  }


  remove(id: number) {
    return this.staffSubjectRepo.destroy({where:{id}});
  }
}
