import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Staff } from "../../staff/models/staff.model";
import { Group } from "../../group/models/group.model";

interface StaffGroupCreateAtrr {
    staff_id: number;
    group_id: number;
}

@Table({tableName: "staff_group"})
export class StaffGroup extends Model<StaffGroup, StaffGroupCreateAtrr> {
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

    @ForeignKey(()=>Group)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    group_id: number;

    @BelongsTo(()=>Group)
    group: Group
    
    @BelongsTo(()=>Staff)
    staff: Staff
}
