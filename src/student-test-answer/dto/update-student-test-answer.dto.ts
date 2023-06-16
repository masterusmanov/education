import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsBoolean, IsOptional} from "class-validator";
export class UpdateStudentTestAnswerDto {
    @ApiProperty({example: '1', description: "Answer ID"})
    @IsNotEmpty()
    @IsInt()
    answer_id: number;
}
