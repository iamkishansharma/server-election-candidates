import { PartialType } from '@nestjs/mapped-types';
import { CreatePoliticalPartyDto } from './create-political-party.dto';

export class UpdatePoliticalPartyDto extends PartialType(CreatePoliticalPartyDto) {}
