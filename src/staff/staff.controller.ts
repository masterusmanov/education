import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { LoginStaffDto } from './dto/login-staff.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ActivateStaffDto } from './dto/activate-staff.dto';
import { DeactivateStaffDto } from './dto/deactivate-staff.dto copy';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { UserSelfGuard } from '../guards/user-self.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';

@ApiBearerAuth()
@ApiTags('Staff controllers')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @ApiOperation({summary: 'Create new staff'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post('create')
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @ApiOperation({summary: 'staff login'})
  @Post('login')
  login(@Body() loginStaffDto: LoginStaffDto) {
    return this.staffService.login(loginStaffDto);
  }

  @ApiOperation({summary: 'staff update avatar image'})
  @UseGuards(UserSelfGuard)
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  updateImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.staffService.updateImage(+id, file);
  }

  @ApiOperation({summary: 'activate staff'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post('activation')
  activation(activateStaffDto: ActivateStaffDto) {
    return this.staffService.activation(activateStaffDto);
  }

  @ApiOperation({summary: 'deactivate staff'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post('deactivation')
  deactivation(deactivateStaffDto: DeactivateStaffDto) {
    return this.staffService.deactivation(deactivateStaffDto);
  }

  @ApiOperation({summary: 'get all staff'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @ApiOperation({summary: 'get one staff by ID'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @ApiOperation({summary: 'update one staff by ID'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @ApiOperation({summary: 'update staff password with ID'})
  @UseGuards(UserSelfGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('/password/:id')
  updatePassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.staffService.updatePassword(+id, updatePasswordDto);
  } 

  @ApiOperation({summary: 'remove staff by ID'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }
}
