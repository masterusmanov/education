import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './models/question.model';
import { TestService } from '../test/test.service';

@Injectable()
export class QuestionService {

  constructor(
    @InjectModel(Question) private questionRepo: typeof Question,
    private readonly testService: TestService
  ){}
  
  async create(createQuestionDto: CreateQuestionDto) {
    const test = await this.testService.findOne(createQuestionDto.test_id);
    if(!test){
      throw new HttpException("Test not found", HttpStatus.NOT_FOUND);
    }
    const count =await this.findAllForTest(createQuestionDto.test_id);

    if(count.count === test.test_count){
      throw new BadRequestException(`This test already has ${count.count} questions`)
    }

    return this.questionRepo.create(createQuestionDto);
  }

  findAllForTest(test_id: number) {
    return this.questionRepo.findAndCountAll({where:{test_id}});
  }

  findAll(){
    return this.questionRepo.findAll({include:{all:true, nested:true}})
  }

  findOne(id: number) {
    return this.questionRepo.findByPk(id, {include:{all:true, nested:true}});
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {

    if(updateQuestionDto.test_id){
      const test = await this.testService.findOne(updateQuestionDto.test_id);
      if(!test){
        throw new HttpException("Test not found", HttpStatus.NOT_FOUND);
      }
    }

    return this.questionRepo.update(updateQuestionDto, {where:{id}, returning:true});
  }

  remove(id: number) {
    return this.questionRepo.destroy({where:{id}});
  }
}
