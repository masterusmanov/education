import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Roles } from '../decorators/roles-auth.decorators';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Test controllers')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @ApiOperation({summary: 'Create new Test'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @ApiOperation({summary: 'Get all Tests'})
  @Roles('DEKAN', "ADMIN", "TEACHER", "STUDENT")
  @UseGuards(RolesGuard)
  @Get()
  findAll() {
    return this.testService.findAll();
  }

  @ApiOperation({summary: 'Get one Test by ID'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }

  @ApiOperation({summary: 'Update one Test by ID'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @ApiOperation({summary: 'Delete one Test by ID'})
  @Roles('DEKAN', "ADMIN", "TEACHER")
  @UseGuards(RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
