import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Test } from './models/test.model';
import { SubjectService } from '../subject/subject.service';

@Injectable()
export class TestService {

  constructor(
    @InjectModel(Test) private testRepo: typeof Test,
    private readonly subjectService: SubjectService
  ){}
    
  async create(createTestDto: CreateTestDto) {
    const subject =await  this.subjectService.findOne(createTestDto.subject_id);

    if(!subject){
      throw new HttpException("Subject not found", HttpStatus.NOT_FOUND);
    }

    return this.testRepo.create(createTestDto);
  }

  findAll() {
    return this.testRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.testRepo.findByPk(id);
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return this.testRepo.update(updateTestDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.testRepo.destroy({where:{id}});
  }
}
