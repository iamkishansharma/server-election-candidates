import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { HasLocaleDate } from 'src/common/traits/HasLocaleDate';
import { Locale, ParentEntity } from 'src/common/types/locale';
import { LOCALE_DATE_FIELDS_KEY } from 'src/common/decorators/localized-dates.decorator';

@Injectable()
export class LocaleTransformInterceptor<T extends ParentEntity = any> implements NestInterceptor<T, T> {
  private readonly logger = new Logger(LocaleTransformInterceptor.name);

  constructor(
    private readonly hasLocaleDate: HasLocaleDate,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const rawLocale: Locale | Locale[] = (request.headers['x-locale'] as Locale[]) || 'en';
    const sessionLocale = Array.isArray(rawLocale) ? rawLocale[0] : rawLocale;

    const dateFields = this.reflector.get<string[]>(LOCALE_DATE_FIELDS_KEY, context.getHandler());

    // If no date fields are specified, skip transformation
    if (!dateFields || dateFields.length === 0) {
      this.logger.debug('No date fields to transform, skipping localization');
      return next.handle();
    }

    return next.handle().pipe(
      map((data: T | T[]) => {
        if (!data) {
          return data;
        }

        let result: T | T[];

        if (Array.isArray(data)) {
          result = data.map((item) => this.localize(item, sessionLocale, dateFields)) as unknown as T[];
        } else {
          result = this.localize(data, sessionLocale, dateFields);
        }
        return result;
      }),
    );
  }

  private localize(entity: T, sessionLocale: Locale, dateFields: string[]): T {
    try {
      const { ...parent } = entity;
      const result = this.hasLocaleDate.transform(parent, sessionLocale, dateFields) as unknown as T;
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error localizing entity: ${error.message}`, error.stack);
      } else {
        this.logger.error(`Error localizing entity: ${JSON.stringify(error)}`);
      }
      throw error;
    }
  }
}
