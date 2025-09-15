import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePoliticalPartyDto } from './dto/create-political-party.dto';
import { UpdatePoliticalPartyDto } from './dto/update-political-party.dto';
import { PoliticalParty } from './entities/political-party.entity';
import { PoliticalPartyRepository } from './political-parties.repository';

@Injectable()
export class PoliticalPartiesService {
  constructor(private readonly partyRepo: PoliticalPartyRepository) {}

  async create(createDto: CreatePoliticalPartyDto): Promise<PoliticalParty> {
    return this.partyRepo.createPoliticalParty(createDto);
  }

  async findAll(): Promise<PoliticalParty[]> {
    return this.partyRepo.find();
  }

  async findOne(id: string): Promise<PoliticalParty> {
    const party = await this.partyRepo.findOneBy({ id });
    if (!party) {
      throw new NotFoundException(`Political party with id ${id} not found.`);
    }
    return party;
  }

  async update(id: string, updateDto: UpdatePoliticalPartyDto): Promise<PoliticalParty> {
    return this.partyRepo.updatePoliticalParty(id, updateDto);
  }

  async remove(id: string): Promise<void> {
    const party = await this.findOne(id); // ensures party exists
    await this.partyRepo.remove(party);
  }
}
