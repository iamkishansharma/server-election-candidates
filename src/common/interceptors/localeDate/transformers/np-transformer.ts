/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { Logger } from '@nestjs/common';
import { LocaleTransformer } from './locale-transformer';
import { adToBs } from '@sbmdkl/nepali-date-converter';

export class NpLocaleTransformer implements LocaleTransformer {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  convertDate(date: Date | string): string {
    try {
      // Convert input to Date object if it's a string
      const inputDate = typeof date === 'string' ? new Date(date) : date;

      // Validate the date
      if (isNaN(inputDate.getTime())) {
        throw new Error('Invalid date provided');
      }

      const bsDate = adToBs(date);

      // Format the BS date as YYYY-MM-DD
      return `${bsDate}`;
    } catch (error) {
      this.logger.error(`Failed to convert date: ${error.message}`, error.stack);
      // Fallback to original date string if conversion fails
      return typeof date === 'string' ? date : date.toISOString().split('T')[0];
    }
  }
}
