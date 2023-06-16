import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Staff } from "../../staff/models/staff.model";
import { Subject } from "../../subject/models/subject.model";

interface StaffSubjectCreateAtrr {
    staff_id: number;
    subject_id: number;
}

@Table({tableName: "staff_subject"})
export class StaffSubject extends Model<StaffSubject, StaffSubjectCreateAtrr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(()=>Staff)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    staff_id: number;

    @ForeignKey(()=>Subject)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    subject_id: number;

    @BelongsTo(()=>Subject)
    subject: Subject
    
    @BelongsTo(()=>Staff)
    staff: Staff
}
