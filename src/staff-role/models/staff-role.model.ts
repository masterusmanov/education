import { Column, DataType, Table, Model, HasMany, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Staff } from "../../staff/models/staff.model";
import { Role } from "../../role/models/role.model";

interface StaffRoleCreateAtrr {
    staff_id: number;
    role_id: number;
}

@Table({tableName: "staff_role"})
export class StaffRole extends Model<StaffRole, StaffRoleCreateAtrr>{
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

    @ForeignKey(()=>Role)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    role_id: number;

    @BelongsTo(()=>Role)
    role: Role
    
    @BelongsTo(()=>Staff)
    staff: Staff
}
