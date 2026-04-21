import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { HttpCode, HttpStatus } from '@nestjs/common'
import { UploadService } from './upload.service'

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 上传穴位图片
   * 支持 file.path（小程序）和 file.buffer（H5）
   */
  @Post()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const result = await this.uploadService.uploadFile(file)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }
}
