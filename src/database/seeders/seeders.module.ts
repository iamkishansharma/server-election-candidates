import { Logger, Module } from '@nestjs/common';
import { ConfigProviderModule } from 'src/providers/config/provider.module';
import { PostgresDatabaseProviderModule } from 'src/providers/database/postgres/provider.module';
import { Seeder } from './seeders';
import { UserSeederModule } from './users/users.module';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [ConfigProviderModule, PostgresDatabaseProviderModule, UserSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
