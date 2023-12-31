import { Module } from '@nestjs/common'
import { DatabaseModule } from '@app/processors/database/database.module'
import type jwt from 'jsonwebtoken'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '@app/modules/user/jwt.strategy'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

// universal modules
import { ChatdocModule } from './modules/chatdoc/chatdoc.module'
import { CategoryModule } from './modules/chatdoc-category/category.module'
import { TagModule } from './modules/chatdoc-tag/tag.module'
import { MailerModule } from './modules/mailer/mailer.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    DatabaseModule,
    ChatdocModule,
    CategoryModule,
    TagModule,
    MailerModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: 'better-gpt' as jwt.Secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AppController],
  providers: [JwtStrategy, AppService],
})
export class AppModule {}
