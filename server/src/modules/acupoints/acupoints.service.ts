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
    },
    {
      id: '4',
      name: '百会穴',
      category: '督脉',
      image: '',
      position: '在头部，当前发际正中直上5寸，或两耳尖连线的中点处',
      location: '头顶正中线，两耳尖连线交叉点',
      effects: [
        '升阳举陷：头晕、头痛、眩晕',
        '安神定志：失眠、健忘、神经衰弱',
        '开窍醒脑：中风昏迷、休克',
        '升提内脏：子宫脱垂、脱肛'
      ],
      acupuncture: '平刺0.5-0.8寸，局部胀痛',
      moxibustion: '艾条灸5-10分钟，不宜瘢痕灸',
      precautions: [
        '体质虚弱者慎用',
        '高血压患者不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '5',
      name: '曲池穴',
      category: '手阳明大肠经',
      image: '',
      position: '在肘横纹外侧端，屈肘，当尺泽与肱骨外上髁连线中点',
      location: '屈肘成直角，在肘横纹外侧端与肱骨外上髁连线中点',
      effects: [
        '清热解表：感冒发热、咽喉肿痛',
        '通经活络：肘臂疼痛、手臂麻木',
        '调节胃肠：腹痛、腹泻、痢疾',
        '祛风止痒：皮肤瘙痒、荨麻疹'
      ],
      acupuncture: '直刺0.8-1.5寸，局部酸胀，可扩散至前臂',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '体质虚弱者不宜强刺激'
      ]
    },
    {
      id: '6',
      name: '内关穴',
      category: '手厥阴心包经',
      image: '',
      position: '在前臂掌侧，当曲泽与大陵的连线上，腕横纹上2寸，掌长肌腱与桡侧腕屈肌腱之间',
      location: '腕横纹向上3横指，两筋之间',
      effects: [
        '宁心安神：心悸、失眠、心绞痛',
        '宽胸理气：胸闷、气喘、咳嗽',
        '和胃降逆：胃痛、呕吐、呃逆',
        '镇静安神：癫痫、癔病'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀，可向指端扩散',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '7',
      name: '三阴交',
      category: '足太阴脾经',
      image: '',
      position: '在小腿内侧，当足内踝尖上3寸，胫骨内侧缘后方',
      location: '内踝尖向上4横指，胫骨后缘',
      effects: [
        '调经止带：月经不调、痛经、带下病',
        '健脾和胃：腹胀、腹泻、消化不良',
        '调肝补肾：阳痿、遗精、月经不调',
        '安神助眠：失眠、多梦'
      ],
      acupuncture: '直刺1-1.5寸，局部酸胀，可扩散至足部',
      moxibustion: '艾炷灸5-10壮，或艾条灸10-15分钟',
      precautions: [
        '孕妇禁用',
        '经期不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '8',
      name: '太冲穴',
      category: '足厥阴肝经',
      image: '',
      position: '在足背侧，当第1、2跖骨结合部之前凹陷处',
      location: '足背第一、二跖骨结合部前方凹陷处',
      effects: [
        '疏肝理气：情绪抑郁、胁痛、乳房胀痛',
        '平肝熄风：头痛、眩晕、高血压',
        '调理月经：月经不调、痛经',
        '清肝明目：目赤肿痛、视力模糊'
      ],
      acupuncture: '直刺0.5-0.8寸，局部酸胀',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '体质虚弱者不宜强刺激'
      ]
    },
    {
      id: '9',
      name: '涌泉穴',
      category: '足少阴肾经',
      image: '',
      position: '在足底部，卷足时足前部凹陷处，约当足底第2、3趾趾缝纹头端与足跟连线的前1/3与后2/3交点上',
      location: '足底前1/3处，卷足时足心凹陷处',
      effects: [
        '滋阴补肾：肾虚腰痛、盗汗、遗精',
        '宁心安神：失眠、心悸、神经衰弱',
        '清热降火：发热、口干、咽喉肿痛',
        '强身健体：增强免疫力、抗衰老'
      ],
      acupuncture: '直刺0.5-1寸，局部胀痛',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '10',
      name: '神门穴',
      category: '手少阴心经',
      image: '',
      position: '在腕部，腕掌侧横纹尺侧端，尺侧腕屈肌腱的桡侧凹陷处',
      location: '手腕横纹内侧端，尺侧腕屈肌腱桡侧凹陷处',
      effects: [
        '宁心安神：失眠、健忘、多梦',
        '清心泻火：心烦、心悸、癫狂',
        '益气安神：心气不足、胸闷',
        '调理心神：焦虑、抑郁'
      ],
      acupuncture: '直刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '11',
      name: '中脘穴',
      category: '任脉',
      image: '',
      position: '在上腹部，前正中线上，当脐中上4寸',
      location: '肚脐正上方5横指处',
      effects: [
        '健脾和胃：胃痛、腹胀、呕吐',
        '消食导滞：消化不良、食欲不振',
        '温中散寒：胃寒、腹痛、腹泻',
        '宁心安神：失眠、心悸'
      ],
      acupuncture: '直刺0.8-1.2寸，局部酸胀',
      moxibustion: '艾炷灸5-10壮，或艾条灸15-30分钟',
      precautions: [
        '孕妇慎用',
        '饱腹不宜针刺',
        '不宜强刺激'
      ]
    },
    {
      id: '12',
      name: '神阙穴',
      category: '任脉',
      image: '',
      position: '在腹中部，脐中央',
      location: '肚脐正中央',
      effects: [
        '培元固本：元气不足、身体虚弱',
        '温中散寒：腹痛、腹泻、便秘',
        '调理气血：气血不足、面色萎黄',
        '健脾胃：脾胃虚弱、消化不良'
      ],
      acupuncture: '禁针，只可艾灸',
      moxibustion: '隔姜灸5-10壮，或艾条灸15-30分钟',
      precautions: [
        '严禁针刺',
        '孕妇慎用灸法',
        '灸后注意保暖'
      ]
    },
    {
      id: '13',
      name: '风池穴',
      category: '足少阳胆经',
      image: '',
      position: '在项部，当枕骨之下，与风府相平，胸锁乳突肌与斜方肌上端之间的凹陷处',
      location: '后脑勺下方，两条大筋之间的凹陷处',
      effects: [
        '疏风解表：感冒、头痛、发热',
        '清头明目：头晕、目眩、视力模糊',
        '通经活络：颈项强痛、肩背疼痛',
        '宁心安神：失眠、多梦'
      ],
      acupuncture: '向鼻尖方向斜刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺方向要准确，避免深刺',
        '体质虚弱者慎用'
      ]
    },
    {
      id: '14',
      name: '膻中穴',
      category: '任脉',
      image: '',
      position: '在胸部，当前正中线上，平第4肋间，两乳头连线的中点',
      location: '两乳头连线中点处',
      effects: [
        '宽胸理气：胸闷、气喘、心悸',
        '宁心安神：失眠、多梦、心烦',
        '止咳平喘：咳嗽、气喘、支气管炎',
        '调理乳腺：乳腺增生、乳汁不足'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾炷灸3-5壮，或艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '体质虚弱者慎用'
      ]
    },
    {
      id: '15',
      name: '命门穴',
      category: '督脉',
      image: '',
      position: '在腰部，当后正中线上，第2腰椎棘突下凹陷中',
      location: '后腰部，正对肚脐的脊柱位置',
      effects: [
        '温肾壮阳：阳痿、遗精、腰膝酸软',
        '强腰固本：腰痛、腰肌劳损',
        '温中散寒：腹痛、腹泻、便秘',
        '增强体质：身体虚弱、免疫力低下'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸5-10壮，或艾条灸15-30分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '灸后注意保暖'
      ]
    },
    {
      id: '16',
      name: '腰阳关',
      category: '督脉',
      image: '',
      position: '在腰部，当后正中线上，第4腰椎棘突下凹陷中',
      location: '后腰部，命门穴下方约2横指处',
      effects: [
        '强腰健肾：腰痛、腰肌劳损、腰椎间盘突出',
        '祛风湿：风湿性关节炎、下肢麻木',
        '调理肾气：肾虚、遗精、阳痿',
        '活血通络：腰部扭伤、坐骨神经痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸5-10壮，或艾条灸10-20分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '17',
      name: '太阳穴',
      category: '经外奇穴',
      image: '',
      position: '在颞部，当眉梢与目外眦之间，向后约一横指的凹陷处',
      location: '眉梢与外眼角之间向后约一横指的凹陷处',
      effects: [
        '清肝明目：头痛、偏头痛、视力疲劳',
        '疏风止痛：感冒、牙痛、面部神经痛',
        '安神定志：失眠、神经衰弱',
        '清热消肿：目赤肿痛、结膜炎'
      ],
      acupuncture: '斜刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '不宜强刺激',
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '18',
      name: '迎香穴',
      category: '手阳明大肠经',
      image: '',
      position: '在鼻翼外缘中点旁，当鼻唇沟中',
      location: '鼻翼外缘中点，鼻唇沟处',
      effects: [
        '通鼻窍：鼻塞、鼻炎、嗅觉减退',
        '祛风散寒：感冒、打喷嚏、流鼻涕',
        '镇痛止痛：面部疼痛、三叉神经痛',
        '活血通络：面瘫、面部神经麻痹'
      ],
      acupuncture: '斜刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '不宜强刺激'
      ]
    },
    {
      id: '19',
      name: '气海穴',
      category: '任脉',
      image: '',
      position: '在下腹部，前正中线上，当脐下1.5寸',
      location: '肚脐正下方2横指处',
      effects: [
        '培元固本：元气不足、身体虚弱',
        '益气固脱：虚脱、气喘',
        '调理脾胃：腹胀、腹泻、消化不良',
        '调理下焦：小便不利、尿频'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸5-10壮，或艾条灸15-30分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激'
      ]
    },
    {
      id: '20',
      name: '中极穴',
      category: '任脉',
      image: '',
      position: '在下腹部，前正中线上，当脐下4寸',
      location: '肚脐正下方5横指处',
      effects: [
        '调理膀胱：尿频、尿急、尿失禁',
        '调理生殖：阳痿、遗精、月经不调',
        '温肾壮阳：肾阳不足、腰膝酸软',
        '清热利湿：小便不利、水肿'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸3-5壮，或艾条灸10-20分钟',
      precautions: [
        '孕妇禁用',
        '膀胱充盈时不宜针刺',
        '不宜强刺激'
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
