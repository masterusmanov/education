import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString, IsOptional} from "class-validator";

export class UpdateAnswerDto {
    @ApiProperty({example: 'question id', description: "1"})
    @IsOptional()
    @IsInt()
    question_id?: number;
    @ApiProperty({example: 'any answer to the question', description: "answer to the question, may be wrong"})
    @IsOptional()
    @IsString()
    answer?: string;
    @ApiProperty({example: 'true', description: "true if correct answer, default false"})
    @IsOptional()
    @IsString()
    is_true?: boolean;
}
