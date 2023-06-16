import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './models/staff.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs'
import { LoginStaffDto } from './dto/login-staff.dto';
import { JwtService } from '@nestjs/jwt';
import { FilesService } from '../files/files.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ActivateStaffDto } from './dto/activate-staff.dto';
import { DeactivateStaffDto } from './dto/deactivate-staff.dto copy';
import { StaffRoleService } from '../staff-role/staff-role.service';

@Injectable()
export class StaffService {

  constructor(
    @InjectModel(Staff) private staffRepo: typeof Staff,
    private readonly fileService: FilesService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => StaffRoleService)) private readonly staffRoleService: StaffRoleService
    ){}

  async create(createStaffDto: CreateStaffDto) {
    const {first_name, last_name, phone_number, telegram_link} = createStaffDto
    const login = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`;
    const password = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`;
    const email = createStaffDto.email.toLowerCase();
    const hashed_password = await bcrypt.hash(password, 7);
    const newStaff = await this.staffRepo.create({first_name:first_name.toLowerCase(), last_name:last_name.toLowerCase(), phone_number, telegram_link, email, login: login.toLowerCase(), hashed_password})
    const newRole = await this.staffRoleService.create({staff_id: newStaff.id, role_id:2})
    return {message: "new staff created", newStaff};
  }

  async login(loginStaffDto: LoginStaffDto){
    const login = loginStaffDto.login.toLowerCase();
    const password = loginStaffDto.password

    const staff =await this.findOneByLogin(login);
    if(!staff){
      throw new HttpException('user not found!!', HttpStatus.NOT_FOUND)
    }

    const isMatchPass = await bcrypt.compare(password, staff.hashed_password)
    if(!isMatchPass) {
      throw new BadRequestException('login or password not correct!!!');
    }

    const token = await this.generateToken(staff);

    return {message: "successfully loged", token}
  }

  async update(id: number, updateStaffDto: UpdateStaffDto){
      if(updateStaffDto.email){
        const email = await this.findOneByEmail(updateStaffDto.email.toLowerCase())
        updateStaffDto.email = updateStaffDto.email.toLowerCase();
        if(email){
          throw new BadRequestException('this email already used')
        }
      }
      if(updateStaffDto.login){
        updateStaffDto.login=updateStaffDto.login.toLowerCase()
        const login =await this.findOneByLogin(updateStaffDto.login.toLowerCase())
        if(login){
          throw new BadRequestException('this login already used')
        }
      }

      if(updateStaffDto.first_name){
        updateStaffDto.first_name=updateStaffDto.first_name.toLowerCase()
      }
      if(updateStaffDto.last_name){
        updateStaffDto.last_name=updateStaffDto.last_name.toLowerCase()
      }

      if(updateStaffDto.phone_number){
        const phone_number =await this.findOneByPhone(updateStaffDto.phone_number)
        if(phone_number){
          throw new BadRequestException('this phone number is already used')
        }
      }
      
      return this.staffRepo.update(updateStaffDto, {where:{id}, returning: true})
  }

  async updatePassword(id:number, updatePasswordDto: UpdatePasswordDto){
        const {oldPassword, newPassword, confirm_password} = updatePasswordDto;

        const staff = await this.findOne(id)
        if(!staff){
          throw new HttpException("staff not found", HttpStatus.NOT_FOUND)
        }

        const isMatchPass = await bcrypt.compare(oldPassword, staff.hashed_password)
        if(!isMatchPass) {
          throw new BadRequestException('password not correct!!!');
        }

        if(newPassword !== confirm_password){
          throw new BadRequestException('password not match!!!');
        }

        const hashed_password = await bcrypt.hash(newPassword, 7);

        await this.staffRepo.update({hashed_password},{where:{id: staff.id}, returning: true})
        return {message: "password updated"}
  }


  async updateImage(id: number, file: Express.Multer.File){
    const staff = await this.findOne(id);
    if(!staff){
      throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    }
    await this.fileService.validateImageFile(file);
    
    const fileName = await this.fileService.createFile(file);
    const updateStaff = await this.staffRepo.update({image: fileName}, {where: {id: staff.id}, returning:true})
    return {message: "avatar image updated", updateStaff}
  }

  async activation(activateStaffDto: ActivateStaffDto){
    const staff = await this.findOne(activateStaffDto.staff_id)
    if(staff.isActive) {
      throw new BadRequestException("Staff already activ")
    }

    const updateStaff = await this.staffRepo.update({isActive:true}, {where: {id:staff.id}, returning: true})
    return {message: "Staff activated", updateStaff}
  }

  async deactivation(deactivateStaffDto: DeactivateStaffDto){
    const staff = await this.findOne(deactivateStaffDto.staff_id)
    if(!staff.isActive) {
      throw new BadRequestException("Staff already deactiv")
    }

    const updateStaff = await this.staffRepo.update({isActive:true}, {where: {id:staff.id}, returning: true})
    return {message: "Staff activated", updateStaff}
  }

  findAll() {
    return this.staffRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.staffRepo.findByPk(id, {include: {all:true, nested:true}});
  }

  findOneByEmail(email: string) {
    const emailLower = email.toLowerCase();
    return this.staffRepo.findOne( { where:{email:emailLower}, include:{all:true, nested:true}});
  }

  findOneByPhone(phone_number: string) {
    return this.staffRepo.findOne( { where:{phone_number}, include:{all:true, nested:true}});
  }

  findOneByLogin(login: string) {
    return this.staffRepo.findOne( { where:{login}, include:{all:true}});
  }
 

  remove(id: number) {
    return this.staffRepo.destroy({where: {id}});
  }

  private async generateToken(user: Staff){
    const users = await this.findOne(user.id)
    const jwtPayload = { id: user.id, isActive: user.isActive, roles: users.roles };
    
    const accessToken = await this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      })
  
    return accessToken
  
  }
}
