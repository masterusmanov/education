import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class CreateStaffSubjectDto {
    @ApiProperty({example: '1', description: "Staff ID"})
    @IsNotEmpty()
    @IsInt()
    staff_id: number;
    @ApiProperty({example: '1', description: "Subject ID"})
    @IsNotEmpty()
    @IsInt()
    subject_id: number;
}
