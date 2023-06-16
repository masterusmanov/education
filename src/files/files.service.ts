import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file: any): Promise<string> {
    try {
      const fileName = uuid.v4() + file.originalname;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      await fs.promises.writeFile(path.join(filePath, fileName), file.buffer);
      console.log(fileName, '>>>>>>>>>>>>>>>>>>>>>');
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Error during writing file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFile(fileName: string) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      await fs.promises.rm(path.join(filePath, fileName));
      console.log('file deleted');
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Fileni o`chirishda xatlik',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateImageFile(file: any): Promise<boolean> {
   
    if (file.size > 1024 * 1024 * 6) {
      throw new HttpException(
        'File size should not exceed 5MB',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new HttpException(
        'Only image files are allowed',
        HttpStatus.BAD_REQUEST,
      );
    }
    
    return true;
  }
}




// import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

// import * as fs from 'fs';
// import * as path from 'path';
// import * as uuid from 'uuid'

// @Injectable()
// export class FilesService {
//     async createFile(file: any): Promise<string> {
//         try {
//             const fileName = uuid.v4() + file.originalname;
//             const filePath = path.resolve(__dirname,'..', 'static');
            
//             if(!fs.existsSync(filePath)) {
//                 fs.mkdirSync(filePath, { recursive: true});
//             }
//             fs.writeFileSync(path.join(filePath,fileName), file.buffer);
//             console.log(fileName, '>>>>>>>>>>>>>>>>>>>>>');
//             return fileName;
            
//         } catch (error) {
//             throw new HttpException(
//                 "Error during writing file",
//                 HttpStatus.INTERNAL_SERVER_ERROR
//             )}
//         }


//         async removeFile(fileName: string){
//             try {
//                 const filePath = path.resolve(__dirname, '..', 'static');
//                 fs.rmSync(path.join(filePath, fileName));
//                 console.log("file deleted");
//                 return fileName;
//             } catch (error) {
//                 throw new HttpException(
//                     "Fileni o`chirishda xatlik",
//                     HttpStatus.INTERNAL_SERVER_ERROR
//                 )
//             }
//         }
//     }

   

