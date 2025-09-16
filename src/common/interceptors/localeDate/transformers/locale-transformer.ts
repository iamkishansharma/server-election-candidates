import { Logger } from '@nestjs/common';

export interface LocaleTransformer {
  logger?: Logger;
  convertDate(date: Date | string): string;
}
