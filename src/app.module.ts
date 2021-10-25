import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config'; 
@Module({
  imports: [ConfigModule.forRoot(),ProductsModule,MongooseModule.forRoot(process.env.MONGOOSE_CONNECT)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}