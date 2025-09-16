import { Locale, LocaleMap } from 'src/common/types/locale';
import { EnLocaleTransformer } from '../transformers/en-transformer';
import { LocaleTransformer } from '../transformers/locale-transformer';
import { NpLocaleTransformer } from '../transformers/np-transformer';

export class LocaleDateTransformerInjector {
  private defaultLocaleIndex = 0;
  public localeMap: LocaleMap[] = [
    {
      locale: 'en',
      transformer: new EnLocaleTransformer(),
    },
    {
      locale: 'np',
      transformer: new NpLocaleTransformer(),
    },
  ];

  private transformer?: LocaleTransformer;

  constructor(locale: Locale) {
    const iLocale = this.localeMap.find((item) => item.locale === locale);

    this.transformer = iLocale?.transformer || this.localeMap[this.defaultLocaleIndex].transformer;

    return this;
  }

  getTransformer() {
    return this.transformer;
  }
}
