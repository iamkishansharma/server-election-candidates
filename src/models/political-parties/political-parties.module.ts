import { Module } from '@nestjs/common';
import { PoliticalPartiesService } from './political-parties.service';
import { PoliticalPartiesController } from './political-parties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoliticalParty } from './entities/political-party.entity';
import { PoliticalPartyRepository } from './political-parties.repository';
import { HasLocaleDate } from 'src/common/traits/HasLocaleDate';

@Module({
  imports: [TypeOrmModule.forFeature([PoliticalParty])],
  providers: [PoliticalPartiesService, PoliticalPartyRepository, HasLocaleDate],
  controllers: [PoliticalPartiesController],
})
export class PoliticalPartiesModule {}
