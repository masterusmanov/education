import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional, IsMobilePhone} from "class-validator";
export class UpdateStudentDto {
    @ApiProperty({example: 'John', description: "Student first name"})
    @IsOptional()
    @IsString()
    first_name?: string;
    @ApiProperty({example: 'Doe', description: "Student last name"})
    @IsOptional()
    @IsString()
    last_name?: string;
    @ApiProperty({example: '+998991112233', description: "Student phone number"})
    @IsOptional()
    @IsMobilePhone('uz-UZ')
    phone_number?: string;
    @ApiProperty({example: 'John_doe', description: "Student login, optional, use to update login"})
    @IsOptional()
    @IsString()
    login?:string;
}
