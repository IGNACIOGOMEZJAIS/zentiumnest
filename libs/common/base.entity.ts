import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'Unique identifier',
    example: '1',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-12-19T20:15:48.000Z',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-12-19T20:15:48.000Z',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ApiProperty({
    description: 'Whether the entity is active',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;
}
