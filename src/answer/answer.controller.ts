import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Answer controllers')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  
  @ApiOperation({summary: 'Create new answer'})
  @Roles('DEKAN', "TEACHER")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.create(createAnswerDto);
  }

  @ApiOperation({summary: 'Get all answers'})
  @Roles('DEKAN', "TEACHER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @ApiOperation({summary: 'Get one answers by ID'})
  @Roles('DEKAN', "TEACHER", "STUDENT")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(+id);
  }

  @ApiOperation({summary: 'Update one answers by ID'})
  @Roles('DEKAN', "TEACHER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(+id, updateAnswerDto);
  }

  @ApiOperation({summary: 'Remove one answers by ID'})
  @Roles('DEKAN', "TEACHER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.answerService.remove(+id);
  }
}
