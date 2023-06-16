import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStudentTestAnswerDto } from './dto/create-student-test-answer.dto';
import { UpdateStudentTestAnswerDto } from './dto/update-student-test-answer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { StudentTestAnswer } from './models/student-test-answer.model';
import { StudentTestService } from '../student-test/student-test.service';
import { QuestionService } from '../question/question.service';
import { AnswerService } from '../answer/answer.service';
import { UpdateResultDto } from './dto/update-result.dto';

@Injectable()
export class StudentTestAnswerService {

  constructor(
    @InjectModel(StudentTestAnswer) private readonly studentAnswerRepo: typeof StudentTestAnswer,
    private readonly studentTestService: StudentTestService,
    private readonly questionService: QuestionService,
    private readonly answerService: AnswerService,
  ){}
    
  async create(createStudentTestAnswerDto: CreateStudentTestAnswerDto) {

    const test =await this.studentTestService.findOne(createStudentTestAnswerDto.student_test_id);
    if(!test){
      throw new HttpException("Student's test not founded", HttpStatus.NOT_FOUND)
    }

    const question = await this.questionService.findOne(createStudentTestAnswerDto.question_id);
    if(!question){
      throw new HttpException("Question not found", HttpStatus.NOT_FOUND);
    }
 
    const answer = await this.answerService.findOne(createStudentTestAnswerDto.answer_id);
    if(!answer){
      throw new HttpException("Answer not found", HttpStatus.NOT_FOUND);
    }

    if(answer.question_id !== createStudentTestAnswerDto.question_id){
      throw new BadRequestException("this answer do not belong to this question");
    }

    const current_answer = await this.findOneQuestion(createStudentTestAnswerDto.question_id, createStudentTestAnswerDto.student_test_id)
    if(current_answer){
      const udpatedAnswer = await this.update(current_answer.id, {answer_id: createStudentTestAnswerDto.answer_id})
      return {message: "This answer was updated", udpatedAnswer}
    }

    const newAnswer  = await this.studentAnswerRepo.create(createStudentTestAnswerDto);
    return {message:"answer accepted", newAnswer};
  }

  findAll() {
    return this.studentAnswerRepo.findAll({include:{all:true}});
  }

  async findAllCorrects(updateResultDto: UpdateResultDto){
    const answers =await this.studentAnswerRepo.findAll({where:{student_test_id: updateResultDto.student_test_id}, include:{all:true}})
    let correct_answer = 0;
    answers.forEach(el => {
      if(el.answer.is_true){
        correct_answer++;
      }
    })
    const updatedStudentTest = await this.studentTestService.update(updateResultDto.student_test_id, {correct_count: correct_answer})
    return updatedStudentTest
  }

  findOne(id: number) {
    return this.studentAnswerRepo.findByPk(id, {include:{all:true}});
  }

  findOneQuestion(question_id: number, student_test_id:number ){
    return this.studentAnswerRepo.findOne({where:{question_id, student_test_id}})
  }
                
  update(id: number, updateStudentTestAnswerDto: UpdateStudentTestAnswerDto) {
    return this.studentAnswerRepo.update(updateStudentTestAnswerDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.studentAnswerRepo.destroy({where:{id}});
  }
}
