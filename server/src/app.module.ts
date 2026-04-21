import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AcupointsModule } from '@/modules/acupoints/acupoints.module';
import { UploadModule } from '@/modules/upload/upload.module';

@Module({
  imports: [AcupointsModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
