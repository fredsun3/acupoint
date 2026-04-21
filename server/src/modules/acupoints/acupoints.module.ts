import { Module } from '@nestjs/common'
import { AcupointsController } from './acupoints.controller'
import { AcupointsService } from './acupoints.service'

@Module({
  controllers: [AcupointsController],
  providers: [AcupointsService],
  exports: [AcupointsService]
})
export class AcupointsModule {}
