import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional, IsMobilePhone} from "class-validator";
export class CreateStudentDto {
    @ApiProperty({example: '1', description: "Group ID"})
    @IsNotEmpty()
    @IsInt()
    group_id: number;
    @ApiProperty({example: 'John', description: "Student first name"})
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @ApiProperty({example: 'Doe', description: "Student last name"})
    @IsNotEmpty()
    @IsString()
    last_name: string;
    @ApiProperty({example: '+998991112233', description: "Student phone number"})
    @IsNotEmpty()
    @IsMobilePhone('uz-UZ')
    phone_number: string;
    @ApiProperty({example: 'John_doe', description: "Student login, optional, use if standart login already used"})
    @IsOptional()
    @IsString()
    login?:string;
}
