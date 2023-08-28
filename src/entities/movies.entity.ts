import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("movies")
export default class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "integer", nullable: false })
  duration: number;

  @Column({ type: "integer", nullable: false })
  price: number;
}
