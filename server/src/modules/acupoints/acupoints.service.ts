import { Injectable } from '@nestjs/common'
import { HttpException, HttpStatus } from '@nestjs/common'

export interface Acupoint {
  id: string
  name: string
  category: string
  bodyPart: string
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
      bodyPart: '四肢',
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
      bodyPart: '四肢',
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
      bodyPart: '躯干',
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
      bodyPart: '头面颈',
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
      bodyPart: '四肢',
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
      bodyPart: '四肢',
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
      bodyPart: '四肢',
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
      bodyPart: '四肢',
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
      bodyPart: '四肢',
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
      bodyPart: '四肢',
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
      bodyPart: '躯干',
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
      bodyPart: '躯干',
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
      bodyPart: '头面颈',
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
      bodyPart: '躯干',
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
      bodyPart: '躯干',
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
      bodyPart: '躯干',
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
      bodyPart: '头面颈',
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
      bodyPart: '头面颈',
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
      bodyPart: '躯干',
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
      bodyPart: '躯干',
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
    },
    {
      id: '21',
      name: '印堂穴',
      category: '经外奇穴',
      bodyPart: '头面颈',
      image: '',
      position: '在额部，当两眉头之中间',
      location: '两眉连线中点处',
      effects: [
        '安神定志：失眠、健忘、神经衰弱',
        '清头明目：头痛、头晕、视力疲劳',
        '疏风解表：感冒、鼻塞',
        '镇静安神：焦虑、抑郁'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '不宜强刺激',
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '22',
      name: '人中穴',
      category: '督脉',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，当人中沟的上1/3与中1/3交点处',
      location: '鼻唇沟上1/3与中1/3交界处',
      effects: [
        '醒脑开窍：昏迷、中暑、休克',
        '镇静安神：癫狂、痫证',
        '疏通经络：腰背强痛、急性腰扭伤',
        '急救要穴：各种昏厥、急救首选'
      ],
      acupuncture: '向上斜刺0.3-0.5寸，局部剧痛',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '孕妇慎用',
        '针刺手法要轻柔',
        '不宜久留针'
      ]
    },
    {
      id: '23',
      name: '承浆穴',
      category: '任脉',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，颏唇沟的正中凹陷处',
      location: '下唇与下巴之间的凹陷处',
      effects: [
        '消肿止痛：口疮、牙龈肿痛',
        '生津止渴：口渴、糖尿病口干',
        '疏风通络：面瘫、面部神经麻痹',
        '调理任脉：任脉气血不通'
      ],
      acupuncture: '斜刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激'
      ]
    },
    {
      id: '24',
      name: '睛明穴',
      category: '足太阳膀胱经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，目内眦角稍上方凹陷处',
      location: '内眼角稍上方凹陷处',
      effects: [
        '明目退翳：近视、远视、散光',
        '疏风清热：目赤肿痛、结膜炎',
        '通络明目：视神经萎缩、青光眼',
        '缓解眼疲劳：眼干、眼涩、视力模糊'
      ],
      acupuncture: '直刺0.3-0.5寸，局部酸胀',
      moxibustion: '禁灸',
      precautions: [
        '禁灸',
        '针刺要轻柔，避免出血',
        '不宜提插捻转'
      ]
    },
    {
      id: '25',
      name: '攒竹穴',
      category: '足太阳膀胱经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，当眉头陷中，眶上切迹处',
      location: '眉毛内侧端凹陷处',
      effects: [
        '明目止痛：头痛、眉棱骨痛',
        '疏风清热：目赤肿痛、结膜炎',
        '缓解眼疲劳：视疲劳、眼干',
        '通络止痛：面瘫、三叉神经痛'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '不宜强刺激',
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '26',
      name: '丝竹空穴',
      category: '手少阳三焦经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，当眉梢凹陷处',
      location: '眉毛外侧端凹陷处',
      effects: [
        '疏风明目：偏头痛、视力模糊',
        '清热消肿：目赤肿痛、结膜炎',
        '疏风解表：感冒、头痛',
        '通络止痛：面瘫、面部神经麻痹'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '禁灸',
      precautions: [
        '禁灸',
        '不宜强刺激',
        '孕妇慎用'
      ]
    },
    {
      id: '27',
      name: '瞳子髎穴',
      category: '足少阳胆经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，目外眦旁，当眶外侧缘处',
      location: '外眼角旁凹陷处',
      effects: [
        '明目止痛：偏头痛、目赤肿痛',
        '清热明目：结膜炎、角膜炎',
        '疏风通络：面瘫、三叉神经痛',
        '缓解眼疲劳：眼干、眼涩'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '不宜强刺激',
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '28',
      name: '四白穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，瞳孔直下，当眶下孔凹陷处',
      location: '眼球正下方1寸处凹陷',
      effects: [
        '明目退翳：近视、散光',
        '疏风清热：目赤肿痛、结膜炎',
        '通络止痛：面瘫、三叉神经痛',
        '缓解眼疲劳：眼干、眼涩'
      ],
      acupuncture: '直刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '不宜强刺激',
        '孕妇慎用',
        '针刺不宜过深'
      ]
    },
    {
      id: '29',
      name: '承泣穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，瞳孔直下，当眼球与眶下缘之间',
      location: '眼球正下方，眶下缘处',
      effects: [
        '明目退翳：近视、散光、夜盲',
        '疏风清热：目赤肿痛、结膜炎',
        '通络明目：视神经萎缩',
        '缓解眼疲劳：眼干、眼涩'
      ],
      acupuncture: '直刺0.3-0.5寸，局部酸胀',
      moxibustion: '禁灸',
      precautions: [
        '禁灸',
        '针刺要轻柔，避免损伤眼球',
        '不宜提插捻转'
      ]
    },
    {
      id: '30',
      name: '地仓穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，口角外侧，上直对瞳孔',
      location: '嘴角外侧，平对瞳孔处',
      effects: [
        '疏风通络：面瘫、面部神经麻痹',
        '消肿止痛：口疮、牙龈肿痛',
        '疏风解表：流涎、口眼歪斜',
        '通络止痛：三叉神经痛'
      ],
      acupuncture: '斜刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '31',
      name: '颊车穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在面颊部，下颌角前上方约一横指（中指），当咀嚼时咬肌隆起，按之凹陷处',
      location: '下颌角前方，咬肌隆起处',
      effects: [
        '疏风通络：面瘫、面部神经麻痹',
        '消肿止痛：牙痛、腮腺炎',
        '疏风解表：流涎、口眼歪斜',
        '通络止痛：三叉神经痛'
      ],
      acupuncture: '直刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '32',
      name: '下关穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部耳前方，当颧弓与下颌切迹所形成的凹陷中',
      location: '耳屏前方，颧弓下缘凹陷处',
      effects: [
        '消肿止痛：牙痛、腮腺炎',
        '疏风通络：面瘫、面部神经麻痹',
        '疏风解表：耳鸣、耳聋',
        '通络止痛：三叉神经痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '闭口取穴'
      ]
    },
    {
      id: '33',
      name: '听宫穴',
      category: '手太阳小肠经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，耳屏前，下颌骨髁状突的后方，张口时呈凹陷处',
      location: '耳屏前方，张口时的凹陷处',
      effects: [
        '聪耳明目：耳鸣、耳聋',
        '疏风清热：中耳炎、外耳道炎',
        '疏风通络：面瘫、面部神经麻痹',
        '通络止痛：牙痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '张口取穴',
        '不宜强刺激',
        '孕妇慎用'
      ]
    },
    {
      id: '34',
      name: '听会穴',
      category: '足少阳胆经',
      bodyPart: '头面颈',
      image: '',
      position: '在面部，当耳屏间切迹的前方，下颌骨髁状突的后方，张口有凹陷处',
      location: '耳屏前方，听宫穴下方凹陷处',
      effects: [
        '聪耳明目：耳鸣、耳聋',
        '疏风清热：中耳炎、外耳道炎',
        '疏风通络：面瘫、面部神经麻痹',
        '通络止痛：牙痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '张口取穴',
        '不宜强刺激',
        '孕妇慎用'
      ]
    },
    {
      id: '35',
      name: '翳风穴',
      category: '手少阳三焦经',
      bodyPart: '头面颈',
      image: '',
      position: '在耳垂后方，当乳突与下颌角之间的凹陷处',
      location: '耳垂后方，乳突与下颌角之间凹陷',
      effects: [
        '聪耳明目：耳鸣、耳聋',
        '疏风清热：中耳炎、外耳道炎',
        '疏风通络：面瘫、面部神经麻痹',
        '通络止痛：腮腺炎'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '36',
      name: '角孙穴',
      category: '手少阳三焦经',
      bodyPart: '头面颈',
      image: '',
      position: '在头部，折耳廓向前，当耳尖直上入发际处',
      location: '耳尖直上，发际处',
      effects: [
        '疏风清热：偏头痛、目赤肿痛',
        '清利头目：视力疲劳、结膜炎',
        '疏风通络：腮腺炎',
        '通络止痛：三叉神经痛'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '37',
      name: '头维穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在头侧部，当额角发际上0.5寸，头正中线旁4.5寸',
      location: '额角发际上0.5寸，距中线4.5寸',
      effects: [
        '清头明目：偏头痛、头晕',
        '疏风解表：感冒、头痛',
        '疏风清热：目赤肿痛、结膜炎',
        '通络止痛：面瘫'
      ],
      acupuncture: '平刺0.5-0.8寸，局部酸胀',
      moxibustion: '禁灸',
      precautions: [
        '禁灸',
        '不宜强刺激',
        '孕妇慎用'
      ]
    },
    {
      id: '38',
      name: '上星穴',
      category: '督脉',
      bodyPart: '头面颈',
      image: '',
      position: '在头部，当前发际正中直上1寸',
      location: '前发际正中直上1寸',
      effects: [
        '清头明目：偏头痛、头晕',
        '疏风解表：感冒、鼻塞',
        '清利头目：视力疲劳、结膜炎',
        '通络止痛：鼻炎'
      ],
      acupuncture: '平刺0.5-0.8寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '39',
      name: '神庭穴',
      category: '督脉',
      bodyPart: '头面颈',
      image: '',
      position: '在头部，当前发际正中直上0.5寸',
      location: '前发际正中直上0.5寸',
      effects: [
        '清头明目：偏头痛、头晕',
        '疏风解表：感冒、失眠',
        '宁心安神：癫狂、痫证',
        '清利头目：视力疲劳'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '40',
      name: '头临泣穴',
      category: '足少阳胆经',
      bodyPart: '头面颈',
      image: '',
      position: '在头部，当瞳孔直上入前发际0.5寸，神庭与头维连线的中点处',
      location: '瞳孔直上，前发际0.5寸',
      effects: [
        '清头明目：偏头痛、头晕',
        '疏风清热：目赤肿痛、结膜炎',
        '清利头目：视力疲劳、近视',
        '通络止痛：鼻炎'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '41',
      name: '风府穴',
      category: '督脉',
      bodyPart: '头面颈',
      image: '',
      position: '在项部，当后发际正中直上1寸，枕外隆凸直下，两侧斜方肌之间凹陷中',
      location: '后发际正中直上1寸凹陷处',
      effects: [
        '疏风解表：感冒、头痛',
        '清头明目：头晕、目眩',
        '通经活络：颈项强痛',
        '宁心安神：失眠、健忘'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺方向要准确，避免深刺',
        '体质虚弱者慎用'
      ]
    },
    {
      id: '42',
      name: '哑门穴',
      category: '督脉',
      bodyPart: '头面颈',
      image: '',
      position: '在项部，当后发际正中直上0.5寸，第1颈椎下',
      location: '后发际正中直上0.5寸',
      effects: [
        '开窍醒神：中风失语、舌强不语',
        '疏风解表：感冒、头痛',
        '通经活络：颈项强痛',
        '宁心安神：失眠、健忘'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺方向要准确，避免深刺',
        '体质虚弱者慎用'
      ]
    },
    {
      id: '43',
      name: '天柱穴',
      category: '足太阳膀胱经',
      bodyPart: '头面颈',
      image: '',
      position: '在项部，大筋（斜方肌）外缘之后发际凹陷中，约当后发际正中旁开1.3寸',
      location: '后发际正中旁开1.3寸，斜方肌外缘',
      effects: [
        '疏风解表：感冒、头痛',
        '清头明目：头晕、目眩',
        '通经活络：颈项强痛、肩背疼痛',
        '宁心安神：失眠、健忘'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '体质虚弱者慎用'
      ]
    },
    {
      id: '44',
      name: '完骨穴',
      category: '足少阳胆经',
      bodyPart: '头面颈',
      image: '',
      position: '在头部，当耳后乳突的后下方凹陷处',
      location: '耳后乳突后下方凹陷处',
      effects: [
        '疏风清热：头痛、偏头痛',
        '清利头目：头晕、目眩',
        '聪耳明目：耳鸣、耳聋',
        '通经活络：颈项强痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '45',
      name: '率谷穴',
      category: '足少阳胆经',
      bodyPart: '头面颈',
      image: '',
      position: '在头部，当耳尖直上入发际1.5寸，角孙直上方',
      location: '耳尖直上，发际1.5寸',
      effects: [
        '疏风清热：偏头痛、头晕',
        '清利头目：目赤肿痛、结膜炎',
        '疏风解表：感冒、头痛',
        '通络止痛：三叉神经痛'
      ],
      acupuncture: '平刺0.3-0.5寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '46',
      name: '大椎穴',
      category: '督脉',
      bodyPart: '头面颈',
      image: '',
      position: '在后正中线上，第7颈椎棘突下凹陷中',
      location: '颈部下方，第7颈椎棘突下',
      effects: [
        '疏风解表：感冒发热、疟疾',
        '清热解毒：咽喉肿痛、扁桃体炎',
        '通经活络：颈项强痛、肩背疼痛',
        '振奋阳气：身体虚弱、免疫力低下'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾炷灸5-10壮，或艾条灸10-20分钟',
      precautions: [
        '孕妇慎用',
        '不宜强刺激',
        '针刺不宜过深'
      ]
    },
    {
      id: '47',
      name: '廉泉穴',
      category: '任脉',
      bodyPart: '头面颈',
      image: '',
      position: '在颈部，当前正中线上，结喉上方，舌骨上缘凹陷处',
      location: '喉结上方，舌骨上缘凹陷',
      effects: [
        '利咽开音：咽喉肿痛、失音',
        '清热消肿：舌强不语、中风失语',
        '疏风解表：感冒、咳嗽',
        '通经活络：颈项强痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸3-5分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '避免损伤血管'
      ]
    },
    {
      id: '48',
      name: '扶突穴',
      category: '手阳明大肠经',
      bodyPart: '头面颈',
      image: '',
      position: '在颈外侧部，结喉旁，当胸锁乳突肌的前后缘之间',
      location: '喉结旁开3寸，胸锁乳突肌前后缘之间',
      effects: [
        '利咽开音：咽喉肿痛、失音',
        '疏风解表：感冒、咳嗽',
        '疏风通络：面瘫、面部神经麻痹',
        '通经活络：颈项强痛'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '避免损伤血管'
      ]
    },
    {
      id: '49',
      name: '天鼎穴',
      category: '手阳明大肠经',
      bodyPart: '头面颈',
      image: '',
      position: '在颈外侧部，胸锁乳突肌后缘，当结喉旁开3寸',
      location: '喉结旁开3寸，胸锁乳突肌后缘',
      effects: [
        '疏风清热：咽喉肿痛、扁桃体炎',
        '疏风解表：感冒、咳嗽',
        '疏风通络：颈项强痛、肩背疼痛',
        '通络止痛：手臂麻木'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '避免损伤血管'
      ]
    },
    {
      id: '50',
      name: '天容穴',
      category: '手太阳小肠经',
      bodyPart: '头面颈',
      image: '',
      position: '在颈外侧部，当下颌角的后方，胸锁乳突肌的前缘凹陷中',
      location: '下颌角后方，胸锁乳突肌前缘',
      effects: [
        '疏风清热：咽喉肿痛、扁桃体炎',
        '疏风解表：感冒、咳嗽',
        '疏风通络：颈项强痛、肩背疼痛',
        '通络止痛：耳鸣、耳聋'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '避免损伤血管'
      ]
    },
    {
      id: '51',
      name: '天牖穴',
      category: '手少阳三焦经',
      bodyPart: '头面颈',
      image: '',
      position: '在颈侧部，当乳突的后方直下，平下颌角，胸锁乳突肌的后缘',
      location: '乳突后方直下，平下颌角，胸锁乳突肌后缘',
      effects: [
        '疏风清热：头痛、头晕',
        '疏风解表：感冒、耳鸣、耳聋',
        '疏风通络：颈项强痛、肩背疼痛',
        '通络止痛：面瘫、面部神经麻痹'
      ],
      acupuncture: '直刺0.5-1寸，局部酸胀',
      moxibustion: '艾条灸5-10分钟',
      precautions: [
        '孕妇慎用',
        '针刺不宜过深',
        '避免损伤血管'
      ]
    },
    {
      id: '52',
      name: '人迎穴',
      category: '足阳明胃经',
      bodyPart: '头面颈',
      image: '',
      position: '在颈部，喉结旁开1.5寸，当颈总动脉之后，胸锁乳突肌的前缘',
      location: '喉结旁开1.5寸，颈总动脉后方',
      effects: [
        '利咽开音：咽喉肿痛、失音',
        '疏风清热：高血压、甲状腺肿大',
        '疏风解表：感冒、咳嗽',
        '调理气血：哮喘、呃逆'
      ],
      acupuncture: '避开动脉直刺0.3-0.8寸，局部酸胀',
      moxibustion: '禁灸',
      precautions: [
        '禁灸',
        '避开颈总动脉针刺',
        '孕妇慎用',
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

  /**
   * 更新穴位图片
   */
  updateImage(id: string, imageUrl: string): Acupoint {
    const index = this.acupoints.findIndex(p => p.id === id)
    if (index === -1) {
      throw new HttpException('穴位不存在', HttpStatus.NOT_FOUND)
    }

    this.acupoints[index].image = imageUrl
    return this.acupoints[index]
  }
}
