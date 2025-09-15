/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { PoliticalParty } from './entities/political-party.entity';
import { CreatePoliticalPartyDto } from './dto/create-political-party.dto';

@Injectable()
export class PoliticalPartyRepository extends Repository<PoliticalParty> {
  constructor(dataSource: DataSource) {
    super(PoliticalParty, new EntityManager(dataSource));
  }

  async createPoliticalParty(createPoliticalPartyDto: CreatePoliticalPartyDto): Promise<PoliticalParty> {
    const party = this.create({
      ...createPoliticalPartyDto,
    });

    try {
      await this.save(party);
      return party;
    } catch (error: any) {
      if (error.code === '23505') {
        // duplicate entry (unique constraint)
        throw new ConflictException('Political party with this name or abbreviation already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updatePoliticalParty(partyId: string, updateDto: Partial<CreatePoliticalPartyDto>): Promise<PoliticalParty> {
    const party = await this.findOneBy({ id: partyId });
    if (!party) {
      throw new InternalServerErrorException('Political party not found.');
    }

    Object.assign(party, updateDto);

    try {
      await this.save(party);
      return party;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Political party with this name or abbreviation already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
