import { AbstractEntity } from '@app/common';
import { Entity, Column } from 'typeorm';

@Entity()
export class ZentiumApiUser extends AbstractEntity<ZentiumApiUser> {
  @Column()
  name: string;

  @Column()
  email: string;
}

