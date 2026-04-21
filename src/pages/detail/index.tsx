import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import Taro, { useLoad, useRouter, useShareAppMessage } from '@tarojs/taro'
import { Network } from '@/network'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { MapPin, Zap, Flame, Info } from 'lucide-react-taro'


interface AcupointDetail {
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

const DetailPage = () => {
  const router = useRouter()
  const [detail, setDetail] = useState<AcupointDetail | null>(null)

  useLoad(async () => {
    const { id } = router.params
    console.log('穴位ID:', id)

    if (!id) {
      Taro.showToast({
        title: '参数错误',
        icon: 'none'
      })
      return
    }

    try {
      const res = await Network.request({
        url: '/api/acupoints/detail',
        data: { id }
      })

      console.log('穴位详情:', res.data)

      if (res.data && res.data.data) {
        setDetail(res.data.data)
      } else {
        Taro.showToast({
          title: '获取穴位信息失败',
          icon: 'none'
        })
      }
    } catch (error) {
      console.error('获取穴位详情失败:', error)
      Taro.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      })
    }
  })

  useShareAppMessage(() => {
    return {
      title: detail?.name || '穴位详情',
      path: `/pages/detail/index?id=${detail?.id}`,
      imageUrl: detail?.image
    }
  })

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  if (!detail) {
    return (
      <View className="flex items-center justify-center h-screen">
        <Text className="block text-gray-500">加载中...</Text>
      </View>
    )
  }

  return (
    <View className="min-h-screen bg-gray-50 pb-20">
      {/* 穴位图片区域 */}
      <View className="bg-white mb-4">
        {detail.image ? (
          <Image
            src={detail.image}
            mode="aspectFill"
            className="w-full h-64"
            lazyLoad
          />
        ) : (
          <View className="w-full h-64 bg-gray-100 flex items-center justify-center">
            <View className="text-center">
              <MapPin size={48} color="#C23B34" />
              <Text className="block text-gray-500 mt-2">暂无穴位图片</Text>
            </View>
          </View>
        )}
      </View>

      {/* 穴位基本信息 */}
      <View className="px-4 mb-4">
        <Card>
          <CardHeader>
            <View className="flex justify-between items-start">
              <View className="flex-1">
                <CardTitle className="text-2xl text-[#C23B34]">
                  {detail.name}
                </CardTitle>
                <Badge className="mt-2">{detail.category}</Badge>
              </View>
            </View>
          </CardHeader>
        </Card>
      </View>

      {/* 穴位位置 */}
      <View className="px-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin size={20} color="#C23B34" className="mr-2" />
              穴位位置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="block text-base text-gray-900 mb-3">
              {detail.position}
            </Text>
            <Separator className="my-3" />
            <Text className="block text-sm text-gray-600">
              {detail.location}
            </Text>
          </CardContent>
        </Card>
      </View>

      {/* 功效主治 */}
      <View className="px-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>功效主治</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-2">
              {detail.effects.map((effect, index) => (
                <View key={index} className="flex items-start">
                  <View className="w-2 h-2 rounded-full bg-[#C23B34] mt-2 mr-2" />
                  <Text className="block text-base text-gray-900 flex-1">
                    {effect}
                  </Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>

      {/* 针灸方法 */}
      <View className="px-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap size={20} color="#2196F3" className="mr-2" />
              针灸方法
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="block text-base text-gray-900">
              {detail.acupuncture}
            </Text>
          </CardContent>
        </Card>
      </View>

      {/* 艾灸方法 */}
      <View className="px-4 mb-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Flame size={20} color="#FF9800" className="mr-2" />
              艾灸方法
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="block text-base text-gray-900">
              {detail.moxibustion}
            </Text>
          </CardContent>
        </Card>
      </View>

      {/* 注意事项 */}
      <View className="px-4 mb-4">
        <Alert>
          <View className="flex items-start">
            <Info size={20} color="#C23B34" className="mr-2 mt-1" />
            <View className="flex-1">
              <Text className="block text-sm font-semibold text-gray-900 mb-2">
                注意事项
              </Text>
              <View>
                {detail.precautions.map((item, index) => (
                  <Text key={index} className="block text-sm text-gray-600 mt-1">
                    • {item}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Alert>
      </View>

      {/* 底部操作栏 */}
      <View
        style={{
          position: 'fixed',
          bottom: 50,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          padding: '12px',
          backgroundColor: '#fff',
          borderTop: '1px solid #E5E5E5',
          zIndex: 100
        }}
      >
        <Button className="flex-1" variant="outline" onClick={handleShare}>
          分享
        </Button>
        <Button className="flex-1" style={{ backgroundColor: '#C23B34', color: '#fff' }}>
          收藏
        </Button>
      </View>
    </View>
  )
}

export default DetailPage
