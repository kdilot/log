import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'Post' })
export class Post extends Model {
  @Column({
    autoIncrement: true,
    primaryKey: true,
  })
  public no?: number

  @Column(DataType.STRING(50))
  public title!: string

  @Column(DataType.TEXT)
  public contents!: string
}
