import { Injectable, BadRequestException } from '@nestjs/common'
import * as fs from 'fs'
import { S3Storage } from 'coze-coding-dev-sdk'

@Injectable()
export class UploadService {
  private storage: S3Storage

  constructor() {
    // 初始化对象存储
    this.storage = new S3Storage({
      endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
      accessKey: '',
      secretKey: '',
      bucketName: process.env.COZE_BUCKET_NAME,
      region: 'cn-beijing',
    })
  }

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

    console.log('上传文件信息:')
    console.log('- 文件名:', file.originalname)
    console.log('- 文件类型:', file.mimetype)
    console.log('- 文件大小:', file.size)

    try {
      // 上传到对象存储
      const fileKey = await this.storage.uploadFile({
        fileContent,
        fileName: `acupoints/${Date.now()}_${file.originalname}`,
        contentType: file.mimetype,
      })

      console.log('文件上传成功，Key:', fileKey)

      // 生成预签名 URL
      const imageUrl = await this.storage.generatePresignedUrl({
        key: fileKey,
        expireTime: 2592000, // 30 天
      })

      console.log('预签名 URL 已生成')

      return {
        fileKey,
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        imageUrl
      }
    } catch (error) {
      console.error('上传到对象存储失败:', error)
      throw new BadRequestException('文件上传失败')
    }
  }
}
