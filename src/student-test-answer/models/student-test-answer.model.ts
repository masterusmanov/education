import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Question } from "../../question/models/question.model";
import { Answer } from "../../answer/models/answer.model";
import { StudentTest } from "../../student-test/models/student-test.model";

interface StudentTestAnswerCreateAtrr {
    question_id: number;
    answer_id: number;
    student_test_id: number;
}

@Table({tableName: "student_test_answer"})
export class StudentTestAnswer extends Model<StudentTestAnswer, StudentTestAnswerCreateAtrr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=>Question)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    question_id: number;

    @ForeignKey(()=>Answer)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    answer_id: number;

    @ForeignKey(()=>StudentTest)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    student_test_id: number;
    
    @BelongsTo(()=>Question)
    question: Question
    
    @BelongsTo(()=>Answer)
    answer: Answer

    @BelongsTo(()=>StudentTest)
    student_test: StudentTest

}
