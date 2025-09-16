import { Injectable, Scope } from '@nestjs/common';
import { LocaleTransformer } from '../interceptors/localeDate/transformers/locale-transformer';
import { LocaleDateTransformerInjector } from '../interceptors/localeDate/injectors/LocaleDateTransformer.injector';
import { Locale, ParentEntity } from '../types/locale';

@Injectable({ scope: Scope.DEFAULT })
export class HasLocaleDate {
  private transformer?: LocaleTransformer;
  constructor() {} // inject a BS-AD conversion service here if you want

  getTransformer(locale: Locale) {
    return new LocaleDateTransformerInjector(locale).getTransformer();
  }
  /**
   * Merge locale fields into a parent entity
   *
   * @param parent The main entity (e.g. political_party)
   * @param sessionLocale Current session locale (e.g. "np" | "en")
   * @param dateFields Keys of fields that need BS/AD transformation
   */
  transform<T extends ParentEntity>(parent: T, sessionLocale: Locale, dateFields: string[] = []): T {
    this.transformer = this.getTransformer(sessionLocale);

    const result = { ...parent } as Record<string, any>;

    // Handle date conversions
    for (const field of dateFields) {
      if (result[field]) {
        const value = result[field] as string | Date | undefined; // Here value is always assumed to be in AD
        if ((typeof value === 'string' || value instanceof Date) && this.transformer) {
          result[field] = this.transformer.convertDate(value);
        }
      }
    }

    return result as T;
  }
}
