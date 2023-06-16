import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StaffRoleService } from './staff-role.service';
import { CreateStaffRoleDto } from './dto/create-staff-role.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Staff-Role controllers')
@Controller('staff-role')
export class StaffRoleController {
  constructor(private readonly staffRoleService: StaffRoleService) {}

  @ApiOperation({summary: 'Create new staff-role'})
  @Roles('DEKAN')
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createStaffRoleDto: CreateStaffRoleDto) {
    return this.staffRoleService.create(createStaffRoleDto);
  }

  @ApiOperation({summary: 'Get all staff-role'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.staffRoleService.findAll();
  }

  @ApiOperation({summary: 'Get one staff-role by ID'})
  @Roles('DEKAN', "ADMIN")
  @UseGuards(RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffRoleService.findOne(+id);
  }

  @ApiOperation({summary: 'Delete one staff-role by ID'})
  @Roles('DEKAN')
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffRoleService.remove(+id);
  }
}
