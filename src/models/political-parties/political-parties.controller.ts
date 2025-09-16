import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { PoliticalPartiesService } from './political-parties.service';
import { CreatePoliticalPartyDto } from './dto/create-political-party.dto';
import { UpdatePoliticalPartyDto } from './dto/update-political-party.dto';
import { LocalizedDates } from 'src/common/decorators/localized-dates.decorator';
import { LocaleTransformInterceptor } from 'src/common/interceptors/localeDate/locale-date-transform.interceptor';

@Controller('political-parties')
@UseInterceptors(LocaleTransformInterceptor)
export class PoliticalPartiesController {
  constructor(private readonly politicalPartiesService: PoliticalPartiesService) {}

  @Post()
  @LocalizedDates(['dissolved_date', 'founded_date'])
  create(@Body() createPoliticalPartyDto: CreatePoliticalPartyDto) {
    return this.politicalPartiesService.create(createPoliticalPartyDto);
  }

  @Get()
  findAll() {
    return this.politicalPartiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.politicalPartiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoliticalPartyDto: UpdatePoliticalPartyDto) {
    return this.politicalPartiesService.update(id, updatePoliticalPartyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.politicalPartiesService.remove(id);
  }
}
