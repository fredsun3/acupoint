import { Injectable, BadRequestException } from '@nestjs/common'
import * as fs from 'fs'

@Injectable()
export class UploadService {
  /**
   * 上传文件到对象存储
   * 同时支持 file.path（小程序）和 file.buffer（H5）
   */
  async uploadFile(file: Express.Multer.File) {
    let fileContent: Buffer

    // CRITICAL: 同时支持小程序的 file.path 和 H5 的 file.buffer
    if (file.path) {
      // 小程序端：从文件路径读取
      try {
        fileContent = await fs.promises.readFile(file.path)
        console.log('从小端上传，文件路径:', file.path)
      } catch (error) {
        console.error('读取文件失败:', error)
        throw new BadRequestException('文件读取失败')
      }
    } else if (file.buffer) {
      // H5 端：直接使用 buffer
      fileContent = file.buffer
      console.log('从H5端上传，文件大小:', file.buffer.length)
    } else {
      throw new BadRequestException('无法获取文件内容')
    }

    // TODO: 上传到 TOS 对象存储
    // 当前先返回模拟数据
    const fileKey = `acupoints/${Date.now()}_${file.originalname}`

    console.log('上传文件信息:')
    console.log('- 文件名:', file.originalname)
    console.log('- 文件类型:', file.mimetype)
    console.log('- 文件大小:', file.size)
    console.log('- 文件Key:', fileKey)

    // 模拟上传到对象存储，实际应调用 storage.upload()
    const imageUrl = `https://mock-tos-url.com/${fileKey}`

    return {
      fileKey,
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      imageUrl
    }
  }
}
