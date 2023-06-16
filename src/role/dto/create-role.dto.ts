import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class CreateRoleDto {
    @ApiProperty({example: 'DEKAN', description: "Role name"})
    @IsNotEmpty()
    @IsString()
    name:string;

    @ApiProperty({example: 'Super admin will control all staff and students', description: "description of the role"})
    @IsOptional()
    @IsString()
    description?: string;
}
