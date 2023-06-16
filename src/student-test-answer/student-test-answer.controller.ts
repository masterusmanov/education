import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentTestAnswerService } from './student-test-answer.service';
import { CreateStudentTestAnswerDto } from './dto/create-student-test-answer.dto';
import { UpdateStudentTestAnswerDto } from './dto/update-student-test-answer.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Student-test-answer controllers')
@Controller('student-test-answer')
export class StudentTestAnswerController {
  constructor(private readonly studentTestAnswerService: StudentTestAnswerService) {}

  @ApiOperation({summary: 'Create new student-test-answer'})
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStudentTestAnswerDto: CreateStudentTestAnswerDto) {
    return this.studentTestAnswerService.create(createStudentTestAnswerDto);
  }

  @ApiOperation({summary: 'update student-test-answer correct answers'})
  @UseGuards(JwtAuthGuard)
  @Post('/update')
  findAllCorrects(@Body() updateResultDto: UpdateResultDto) {
    return this.studentTestAnswerService.findAllCorrects(updateResultDto);
  }

  @ApiOperation({summary: 'Get all student-test-answer'})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentTestAnswerService.findAll();
  }

  @ApiOperation({summary: 'Get one student-test-answer'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTestAnswerService.findOne(+id);
  }

  @ApiOperation({summary: 'Update one student-test-answer'})
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentTestAnswerDto: UpdateStudentTestAnswerDto) {
    return this.studentTestAnswerService.update(+id, updateStudentTestAnswerDto);
  }

  @ApiOperation({summary: 'Delete one student-test-answer'})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTestAnswerService.remove(+id);
  }
}
