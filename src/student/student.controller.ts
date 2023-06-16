import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivateStudentDto } from './dto/activate-student.dto';
import { DeactivateStudentDto } from './dto/deactivate-student.dto copy';
import { UpdatePasswordDto } from '../staff/dto/update-password.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from '../staff/dto/file-upload.dto';

@ApiBearerAuth()
@ApiTags('Student controllers')
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({summary: 'Create new student'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({summary: 'Login student'})
  @Post('login')
  login(@Body() loginStudentDto: LoginStudentDto) {
    return this.studentService.login(loginStudentDto);
  }


  @ApiOperation({summary: 'Update student avatar image'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.studentService.updateImage(+id, file);
  }

  @ApiOperation({summary: 'Activate student'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('activation')
  activation(activateStudentDto: ActivateStudentDto) {
    return this.studentService.activation(activateStudentDto);
  }

  @ApiOperation({summary: 'Deactivate student'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('deactivation')
  deactivation(deactivateStudentDto: DeactivateStudentDto) {
    return this.studentService.deactivation(deactivateStudentDto);
  }

  @ApiOperation({summary: 'Find all students'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @ApiOperation({summary: 'Find one student by ID'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @ApiOperation({summary: 'Update one student by ID'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @ApiOperation({summary: 'Update one student password'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.studentService.updatePassword(+id, updatePasswordDto);
  }

  @ApiOperation({summary: 'Delete one student by ID'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
