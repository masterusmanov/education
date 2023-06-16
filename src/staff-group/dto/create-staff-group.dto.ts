import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class CreateStaffGroupDto {
    @ApiProperty({example: '1', description: "Staff ID"})
    @IsNotEmpty()
    @IsInt()
    staff_id: number;

    @ApiProperty({example: '1', description: "Group ID"})
    @IsNotEmpty()
    @IsInt()
    group_id: number;
}
