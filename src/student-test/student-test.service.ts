import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStudentTestDto } from './dto/create-student-test.dto';
import { UpdateStudentTestDto } from './dto/update-student-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentTest } from './models/student-test.model';
import { StudentService } from '../student/student.service';
import { TestService } from '../test/test.service';
import { StudentTestAnswerService } from '../student-test-answer/student-test-answer.service';

@Injectable()
export class StudentTestService {

  constructor(
    @InjectModel(StudentTest) private readonly studentTestRepo: typeof StudentTest,
    private readonly studentService: StudentService,
    private readonly testService: TestService,

    ){}
    
  async create(createStudentTestDto: CreateStudentTestDto) {

    const student = await this.studentService.findOne(createStudentTestDto.student_id);
    if(!student){
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    const test = await this.testService.findOne(createStudentTestDto.test_id);
    if(!test){
      throw new HttpException('Test not found', HttpStatus.NOT_FOUND);
    }

    const studentTest = await this.studentTestRepo.create(createStudentTestDto);
    return {message:"new test created", studentTest};
  }

  findAll() {
    return this.studentTestRepo.findAll({include:{all:true}});
  }

  findOne(id: number) {
    return this.studentTestRepo.findByPk(id, {include:{all:true}});
  }

  // async updateCorrectAnswer(id: number){
  //   const answers = await this.studentAnswer.findAllCorrects(id);
  //   console.log(answers);
    
  // }
  async update(id: number, updateStudentTestDto: UpdateStudentTestDto) {
    return this.studentTestRepo.update(updateStudentTestDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.studentTestRepo.destroy({where:{id}});
  }
}
