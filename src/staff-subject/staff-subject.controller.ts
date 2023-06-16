import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffSubjectService } from './staff-subject.service';
import { CreateStaffSubjectDto } from './dto/create-staff-subject.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Staff-subject controllers')
@Controller('staff-subject')
export class StaffSubjectController {
  constructor(private readonly staffSubjectService: StaffSubjectService) {}

  @ApiOperation({summary: 'Create new staff-subject'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStaffSubjectDto: CreateStaffSubjectDto) {
    return this.staffSubjectService.create(createStaffSubjectDto);
  }

  @ApiOperation({summary: 'Get all staff-subject'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.staffSubjectService.findAll();
  }

  @ApiOperation({summary: 'Get one staff-subject by ID'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffSubjectService.findOne(+id);
  }

  @ApiOperation({summary: 'Delete one staff-subject by ID'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffSubjectService.remove(+id);
  }
}
