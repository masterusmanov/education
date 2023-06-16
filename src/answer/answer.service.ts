import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Answer } from './models/answer.model';
import { QuestionService } from '../question/question.service';

@Injectable()
export class AnswerService {

  constructor(
    @InjectModel(Answer) private answerRepo: typeof Answer,
    private readonly questionService: QuestionService
  ){}
  
  async create(createAnswerDto: CreateAnswerDto) {
    const question = await this.questionService.findOne(createAnswerDto.question_id);
    if(!question){
      throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
    }

    const answer = await this.answerRepo.create(createAnswerDto)
    return {message: "answer created", answer};
  }

  findAll() {
    return this.answerRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.answerRepo.findByPk(id, {include:{all:true, nested:true}});
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {

    if(updateAnswerDto.question_id){
      const question = await this.questionService.findOne(updateAnswerDto.question_id);
      if(!question){
        throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
      }
    }
    const updatedAnswer = await this.answerRepo.update(updateAnswerDto, {where:{id}, returning: true});
    return {message:"answer updated", updatedAnswer}
  }

  async remove(id: number) {
    await this.answerRepo.destroy({where:{id}})
    return {message:"answer deleted"};
  }
}
