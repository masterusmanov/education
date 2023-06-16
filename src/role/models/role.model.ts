import { Column, DataType, Table, Model, HasMany, BelongsTo } from "sequelize-typescript";
import { StaffRole } from "../../staff-role/models/staff-role.model";

interface RoleCreateAttr{
    name: string;
    description?: string;
}

@Table({tableName: "role"})
export class Role extends Model<Role, RoleCreateAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    name: string;

    @Column({
        type:DataType.TEXT,
    })
    description: string;

    @HasMany(()=>StaffRole)
    staffs: StaffRole[]

}
