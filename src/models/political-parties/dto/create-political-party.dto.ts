import { IsString, IsOptional, IsDateString, IsUrl, MaxLength } from 'class-validator';

export class CreatePoliticalPartyDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(50)
  abbreviation: string;

  @IsDateString()
  founded_date: string;

  @IsOptional()
  @IsDateString()
  dissolved_date?: string;

  @IsString()
  @MaxLength(255)
  ideology: string;

  @IsString()
  @MaxLength(255)
  hq_location: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  website?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  logo_url?: string;
}
