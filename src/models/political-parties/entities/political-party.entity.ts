import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { HasTimestamps } from 'src/database/interfaces/HasTimestamps';
import { IPoliticalParty } from '../interfaces/political-party.interface';

@Entity({ name: 'political_parties' })
export class PoliticalParty extends HasTimestamps implements IPoliticalParty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  abbreviation: string;

  @Column({ type: 'date' })
  founded_date: string;

  @Column({ type: 'date', nullable: true })
  dissolved_date: string;

  @Column({ type: 'varchar', length: 255 })
  ideology: string;

  @Column({ type: 'varchar', length: 255 })
  hq_location: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  logo_url: string;
}
