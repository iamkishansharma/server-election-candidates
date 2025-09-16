export const LOCALE_DATE_FIELDS_KEY = 'localized:fields';
export const LOCALIZED_RETURN_TYPE_KEY = 'localized:return_type';

import { applyDecorators, SetMetadata } from '@nestjs/common';

export const LocalizedDates = (dates: string[]) => applyDecorators(SetMetadata(LOCALE_DATE_FIELDS_KEY, dates));
