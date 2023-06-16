import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class CreateStaffRoleDto {
    @ApiProperty({example: '1', description: "Staff ID"})
    @IsNotEmpty()
    @IsInt()
    staff_id: number;
    @ApiProperty({example: '1', description: "Role ID"})
    @IsNotEmpty()
    @IsInt()
    role_id:number;
}
