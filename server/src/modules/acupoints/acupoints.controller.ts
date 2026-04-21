import { Controller, Get, Post, Query, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AcupointsService } from './acupoints.service'

@Controller('acupoints')
export class AcupointsController {
  constructor(private readonly acupointsService: AcupointsService) {}

  /**
   * 获取穴位列表
   */
  @Get()
  @HttpCode(200)
  async getList(@Query('category') category?: string) {
    const data = await this.acupointsService.getList(category)
    return {
      code: 200,
      msg: 'success',
      data
    }
  }

  /**
   * 获取穴位详情
   */
  @Get('detail')
  @HttpCode(200)
  async getDetail(@Query('id') id: string) {
    const data = await this.acupointsService.getDetail(id)
    return {
      code: 200,
      msg: 'success',
      data
    }
  }

  /**
   * 搜索穴位
   */
  @Get('search')
  @HttpCode(200)
  async search(@Query('keyword') keyword?: string) {
    const data = await this.acupointsService.search(keyword || '')
    return {
      code: 200,
      msg: 'success',
      data
    }
  }

  /**
   * 更新穴位图片
   */
  @Post('update-image')
  @HttpCode(200)
  async updateImage(@Body() body: { id: string; imageUrl: string }) {
    const result = await this.acupointsService.updateImage(body.id, body.imageUrl)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }
}
