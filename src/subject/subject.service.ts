import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './models/subject.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class SubjectService {

  constructor(
    @InjectModel(Subject) private subjectRepo: typeof Subject,
    private readonly fileService: FilesService,
    ){}
    
  async create(createSubjectDto: CreateSubjectDto, file?: Express.Multer.File) {
    const name = createSubjectDto.name.toLowerCase()
    const subject = await this.findOneByName(name);
    if(subject){
      throw new BadRequestException("Subject with this name already excists")
    }
    let fileName = null;
    if(file){
      fileName = await this.fileService.createFile(file);
    }

    return this.subjectRepo.create({name, image: fileName});
  }

  async updateImage(id: number, file: Express.Multer.File){
    const subject = await this.findOne(id);
    if(!subject){
      throw new HttpException("Subject not found", HttpStatus.NOT_FOUND)
    }

    const validate = await this.fileService.validateImageFile(file);
  
    const fileName = await this.fileService.createFile(file);
    const updateSubject = await this.subjectRepo.update({image: fileName}, {where: {id}, returning:true})
    return {message: "image updated", updateSubject}
  }

  findAll() {
    return this.subjectRepo.findAll({include:{all:true, nested:true}});
  }

  findOne(id: number) {
    return this.subjectRepo.findByPk(id,{include:{all:true, nested:true}});
  }

  findOneByName(name: string) {
    return this.subjectRepo.findOne({where:{name:name.toLowerCase()}, include:{all:true, nested:true}});
  }

  update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return this.subjectRepo.update(updateSubjectDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.subjectRepo.destroy({where:{id}});
  }
}
