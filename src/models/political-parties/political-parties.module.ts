import { Module } from '@nestjs/common';
import { PoliticalPartiesService } from './political-parties.service';
import { PoliticalPartiesController } from './political-parties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliticalParty } from './entities/political-party.entity';
import { PoliticalPartyRepository } from './political-parties.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PoliticalParty])],
  controllers: [PoliticalPartiesController],
  providers: [PoliticalPartiesService, PoliticalPartyRepository],
})
export class PoliticalPartiesModule {}
