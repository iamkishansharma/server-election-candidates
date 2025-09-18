import { Module } from '@nestjs/common';
import { AuthModule } from './models/auth/auth.module';
import { PostgresDatabaseProviderModule } from './providers/database/postgres/provider.module';
import { ConfigProviderModule } from './providers/config/provider.module';
// import { ChatGateway } from './chat.gateway'
import { PoliticalPartiesModule } from './models/political-parties/political-parties.module';

@Module({
  imports: [ConfigProviderModule, PostgresDatabaseProviderModule, AuthModule, PoliticalPartiesModule],

  //  Uncomment the ChatGateway provider for websocket boilerpate
  // requirements for websockets:
  // "@nestjs/platform-socket.io": "^9.2.1",
  // "@nestjs/websockets": "^9.2.1",
  //

  // providers: [ChatGateway]
})
export class AppModule {}
