import { LocaleTransformer } from '../interceptors/localeDate/transformers/locale-transformer';

export type Locale = 'np' | 'en';
export interface LocaleMap {
  locale: Locale;
  transformer: LocaleTransformer;
}

export interface ParentEntity {
  id: number;
  [key: string]: any;
}
