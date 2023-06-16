import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffGroupService } from './staff-group.service';
import { CreateStaffGroupDto } from './dto/create-staff-group.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Staff-Group controllers')
@Controller('staff-group')
export class StaffGroupController {
  constructor(private readonly staffGroupService: StaffGroupService) {}

  @ApiOperation({summary: 'Create new staff-group'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStaffGroupDto: CreateStaffGroupDto) {
    return this.staffGroupService.create(createStaffGroupDto);
  }

  @ApiOperation({summary: 'Get all staff-group'})
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.staffGroupService.findAll();
  }

  @ApiOperation({summary: 'get one staff-group by ID'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffGroupService.findOne(+id);
  }

  @ApiOperation({summary: 'delete one staff-group by ID'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffGroupService.remove(+id);
  }
}
