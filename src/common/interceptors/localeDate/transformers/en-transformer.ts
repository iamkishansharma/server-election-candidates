import { LocaleTransformer } from './locale-transformer';

export class EnLocaleTransformer implements LocaleTransformer {
  convertDate(date: Date | string): string {
    return date.toString(); // do nothing
  }
}
