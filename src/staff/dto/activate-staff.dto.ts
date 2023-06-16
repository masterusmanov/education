import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class ActivateStaffDto{
    @ApiProperty({example: '1', description: "Staff ID"})
    @IsNotEmpty()
    @IsInt()
    staff_id: number;
}