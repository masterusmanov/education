import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class UpdateRoleDto {
    @ApiProperty({example: 'DEKAN', description: "Role name"})
    @IsOptional()
    @IsString()
    name?:string;

    @ApiProperty({example: 'Super admin will control all staff and students', description: "description of the role"})
    @IsOptional()
    @IsString()
    description?: string;
}
