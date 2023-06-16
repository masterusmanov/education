import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentTestService } from './student-test.service';
import { CreateStudentTestDto } from './dto/create-student-test.dto';
import { UpdateStudentTestDto } from './dto/update-student-test.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Student-Test controllers')
@Controller('student-test')
export class StudentTestController {
  constructor(private readonly studentTestService: StudentTestService) {}

  @ApiOperation({summary: 'Create new Student-Test'})
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStudentTestDto: CreateStudentTestDto) {
    return this.studentTestService.create(createStudentTestDto);
  }

  @ApiOperation({summary: 'Get all Student-Test'})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.studentTestService.findAll();
  }

  @ApiOperation({summary: 'Get one Student-Test'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentTestService.findOne(+id);
  }

  @ApiOperation({summary: 'Update Student-Test'})
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentTestDto: UpdateStudentTestDto) {
    return this.studentTestService.update(+id, updateStudentTestDto);
  }

  @ApiOperation({summary: 'Update Student-Test'})
  @Roles("TEACHER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentTestService.remove(+id);
  }
}
