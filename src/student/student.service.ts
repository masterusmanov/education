import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './models/student.model';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { GroupService } from '../group/group.service';
import { LoginStudentDto } from './dto/login-student.dto';
import { UpdatePasswordDto } from '../staff/dto/update-password.dto';
import { ActivateStudentDto } from './dto/activate-student.dto';
import { DeactivateStudentDto } from './dto/deactivate-student.dto copy';

@Injectable()
export class StudentService {

  constructor(
    @InjectModel(Student) private studentRepo: typeof Student,
    private readonly fileService: FilesService,
    private readonly jwtService: JwtService,
    private readonly groupService: GroupService,
    ){}

  async create(createStudentDto: CreateStudentDto) {
    const {first_name, last_name, phone_number, group_id} = createStudentDto
    const group = await this.groupService.findOne(group_id);
    if(!group){
      throw new HttpException("Group not found", HttpStatus.NOT_FOUND);
    }
      
    const login = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`;
    
    const password = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`;
    const hashed_password = await bcrypt.hash(password, 7);
    const newStudent = await this.studentRepo.create({first_name:first_name.toLowerCase(), last_name:last_name.toLowerCase(), phone_number, login: login.toLowerCase(), hashed_password, group_id})
    return {message: "new student created", newStudent};
  }

  async login(loginStudentDto: LoginStudentDto){
    const login = loginStudentDto.login.toLowerCase();
    const password = loginStudentDto.password

    const student =await this.findOneByLogin(login);
    if(!student){
      throw new HttpException('student not found!!', HttpStatus.NOT_FOUND)
    }

    const isMatchPass = await bcrypt.compare(password, student.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('login or password not correct!!!');
    }

    const token = await this.generateToken(student);

    return {message: "successfully loged", token}
  }

  async updatePassword(id:number, updatePasswordDto: UpdatePasswordDto){
    const {oldPassword, newPassword, confirm_password} = updatePasswordDto;

    const student = await this.findOne(id)
    if(!student){
      throw new HttpException("student not found", HttpStatus.NOT_FOUND)
    }

    const isMatchPass = await bcrypt.compare(oldPassword, student.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('password not correct!!!');
    }

    if(newPassword !== confirm_password){
      throw new BadRequestException('password not match!!!');
    }

    const hashed_password = await bcrypt.hash(newPassword, 7);

    await this.studentRepo.update({hashed_password},{where:{id: student.id}, returning: true})
    return {message: "password updated"}
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    if(updateStudentDto.login){
      updateStudentDto.login=updateStudentDto.login.toLowerCase()
      const login =await this.findOneByLogin(updateStudentDto.login)
      if(login){
        throw new BadRequestException('this login already used')
      }
    }

    if(updateStudentDto.first_name){
      updateStudentDto.first_name=updateStudentDto.first_name.toLowerCase()
    }
    if(updateStudentDto.last_name){
      updateStudentDto.last_name=updateStudentDto.last_name.toLowerCase()
    }

    if(updateStudentDto.phone_number){
      const phone_number =await this.findOneByPhone(updateStudentDto.phone_number)
      if(phone_number){
        throw new BadRequestException('this phone number is already used')
      }
    }
    return this.studentRepo.update(updateStudentDto, {where:{id}, returning: true});
  }

  async updateImage(id: number, file: Express.Multer.File){
    const student = await this.findOne(id);
    if(!student){
      throw new HttpException("Student not found", HttpStatus.NOT_FOUND)
    }
    await this.fileService.validateImageFile(file);
    const fileName = await this.fileService.createFile(file);
    const updateStudent = await this.studentRepo.update({image: fileName}, {where: {id: student.id}, returning:true})
    return {message: "avatar image updated", updateStudent}
  }

  async activation(activateStudentDto: ActivateStudentDto){
    const student = await this.findOne(activateStudentDto.student_id)
    if(student.isActive) {
      throw new BadRequestException("Student already active")
    }

    const updateStudent = await this.studentRepo.update({isActive:true}, {where: {id:student.id}, returning: true})
    return {message: "Student activated", updateStudent}
  }

  async deactivation(deactivateStudentDto: DeactivateStudentDto){
    const student = await this.findOne(deactivateStudentDto.student_id)
    if(!student.isActive) {
      throw new BadRequestException("Student already deactive")
    }

    const updateStudent = await this.studentRepo.update({isActive:true}, {where: {id:student.id}, returning: true})
    return {message: "Student activated", updateStudent}
  }

  findAll() {
    return this.studentRepo.findAll({include:{all: true, nested:true}});
  }

  findOne(id: number) {
    return this.studentRepo.findByPk(id,{include:{all:true, nested:true}});
  }

  findOneByPhone(phone_number: string) {
    return this.studentRepo.findOne( { where:{phone_number}, include:{all:true, nested:true}});
  }

  findOneByLogin(login: string) {
    return this.studentRepo.findOne( { where:{login}, include:{all:true}});
  }

  

  remove(id: number) {
    return this.studentRepo.destroy({where:{id}});
  }

  private async generateToken(user: Student){
    const jwtPayload = { id: user.id, isActive: user.isActive, roles: [{role:{name:'STUDENT'}}] };
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
    })

    return accessToken  
  }
}
