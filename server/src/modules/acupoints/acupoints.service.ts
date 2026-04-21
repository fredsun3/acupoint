import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'

export interface Acupoint {
  id: string
  name: string
  category: string
  image?: string
  position: string
  location: string
  effects: string[]
  acupuncture: string
  moxibustion: string
  precautions: string[]
}

@Injectable()
export class AcupointsService {
  // 模拟数据，实际应从数据库获取
  private acupoints: Acupoint[] = [
    {
      id: '1',
      name: '合谷穴',
      category: '手阳明大肠经',
      image: '',
      position: '在手背，第1、2掌骨间，当第二掌骨桡侧的中点处',
      location: '简便取穴法：以一手的拇指指骨关节横纹，放在另一手拇、食指之间的指蹼缘上，当拇指尖下是穴',
      effects: [
        '镇痛作用：头痛、牙痛、面部疼痛',
        '解表散寒：感冒发热、咽喉肿痛',
        '通经活络：手腕疼痛、手臂麻木',
        '调节胃肠：胃痛、腹胀、便秘'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀，可扩散至整个手掌或手臂',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺手法要轻柔，避免损伤血管',
        '体质虚弱者慎用',
        '不宜长期针刺同一侧合谷穴'
      ]
    },
    {
      id: '2',
      name: '足三里',
      category: '足阳明胃经',
      image: '',
      position: '在小腿前外侧，当犊鼻下3寸，距胫骨前缘一横指（中指）',
      location: '外膝眼下3寸，胫骨前嵴外1横指处',
      effects: [
        '健脾和胃：胃痛、呕吐、腹胀、腹泻',
        '强壮身体：增强免疫力、抗疲劳',
        '调理气血：面色萎黄、气血不足',
        '宁心安神：失眠、心悸'
      ],
      acupuncture: '直刺1-2寸，局部酸胀，可扩散至足背',
      moxibustion: '艾炷灸5-10壮，或艾条灸10-20分钟',
      precautions: [
        '孕妇不宜强刺激',
        '饭后半小时内不宜灸',
        '灸后注意保暖'
      ]
    },
    {
      id: '3',
      name: '关元穴',
      category: '任脉',
      image: '',
      position: '在下腹部，前正中线上，当脐下3寸',
      location: '肚脐正下方4横指处',
      effects: [
        '培元固本：元气不足、身体虚弱',
        '益气固脱：虚脱、中风脱证',
        '温肾壮阳：阳痿、遗精、早泄',
        '调理冲任：月经不调、带下病'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸7-10壮，或艾条灸15-30分钟',
      precautions: [
        '孕妇禁用',
        '不宜强刺激',
        '膀胱充盈时不宜针刺'
      ]
    }
  ]

  /**
   * 获取穴位列表
   */
  async getList(category?: string): Promise<Acupoint[]> {
    if (category) {
      return this.acupoints.filter(p => p.category.includes(category))
    }
    return this.acupoints
  }

  /**
   * 获取穴位详情
   */
  async getDetail(id: string): Promise<Acupoint> {
    const acupoint = this.acupoints.find(p => p.id === id)
    if (!acupoint) {
      throw new HttpException('穴位不存在', HttpStatus.NOT_FOUND)
    }
    return acupoint
  }

  /**
   * 搜索穴位
   */
  async search(keyword: string): Promise<Acupoint[]> {
    const lowerKeyword = keyword.toLowerCase()
    return this.acupoints.filter(
      p =>
        p.name.includes(lowerKeyword) ||
        p.category.includes(lowerKeyword) ||
        p.effects.some(e => e.includes(lowerKeyword))
    )
  }
}
