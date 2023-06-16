import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, IsString} from "class-validator";
export class CreateAnswerDto {
    @ApiProperty({example: 'question id', description: "1"})
    @IsNotEmpty()
    @IsInt()
    question_id: number;
    @ApiProperty({example: 'answer option 2', description: "answer to the question, may be wrong"})
    @IsNotEmpty()
    @IsString()
    answer: string;
    @ApiProperty({example: 'true', description: "true if correct answer, default false"})
    @IsNotEmpty()
    @IsString()
    is_true: boolean;
}
