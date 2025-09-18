import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm/browser';
import path from 'path';

const envFilePath = `.env.${process.env.NODE_ENV || 'local'}`;
config({ path: envFilePath });

const configService = new ConfigService();
const isProduction = process.env.NODE_ENV === 'production';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: !isProduction,
  logging: true,
  entities: [path.resolve(__dirname + '/../models/**/entities/*.{ts,js}')],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  ssl:
    configService.get('DB_HOST') === 'localhost' || configService.get('DB_HOST') === 'db'
      ? false
      : {
          rejectUnauthorized: true,
          ca: configService.get('DB_SSL_CERT'),
        },
};

const datasource = new DataSource(dataSourceOptions);
export default datasource;
