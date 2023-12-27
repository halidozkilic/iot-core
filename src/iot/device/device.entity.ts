import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Command } from '../command/command.entity';

@Entity()
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string;

    @Column()
    status: string;

    @Column('jsonb', { nullable: true })
    data: any;

    @OneToMany(() => Command, (command) => command.device)
    commands: Command[];
}
