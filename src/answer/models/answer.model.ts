import { Column, DataType, Table, Model, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Question } from "../../question/models/question.model";
import { StudentTestAnswer } from "../../student-test-answer/models/student-test-answer.model";

interface AnswerCreateAttr{
    question_id: number;
    answer: string;
    is_true: boolean;
}

@Table({tableName: "answer"})
export class Answer extends Model<Answer, AnswerCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.TEXT,
        allowNull:false,
    })
    answer: string;

    @Column({
        type:DataType.BOOLEAN,
        defaultValue: false
    })
    is_true: boolean;

    @ForeignKey(()=>Question)
    @Column({
        type:DataType.INTEGER,
    })
    question_id: number;

    @BelongsTo(()=>Question)
    question: Question

}
