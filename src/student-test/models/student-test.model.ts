import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Student } from "../../student/models/student.model";
import { Test } from "../../test/models/test.model";
import { StudentTestAnswer } from "../../student-test-answer/models/student-test-answer.model";

interface StudentTestCreateAtrr {
    student_id: number;
    test_id: number;
    correct_count: number;
}

@Table({tableName: "student_test"})
export class StudentTest extends Model<StudentTest, StudentTestCreateAtrr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=>Student)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    student_id: number;

    @ForeignKey(()=>Test)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    test_id: number;

    @Column({
        type:DataType.INTEGER,
    })
    correct_count: number;
    
    @BelongsTo(()=>Student)
    student: Student
    
    @BelongsTo(()=>Test)
    test: Test

    @HasMany(()=>StudentTestAnswer)
    student_answers: StudentTestAnswer[]
}
