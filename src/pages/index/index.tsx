import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { Network } from '@/network'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Activity, Heart } from 'lucide-react-taro'
import './index.css'

const IndexPage = () => {
  useLoad(async () => {
    const res = await Network.request({ url: '/api/hello' })
    console.log(res.data)
  })

  const handleViewAll = () => {
    Taro.switchTab({
      url: '/pages/acupoints/index'
    })
  }

  const handlePointDetail = (id: number) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  const categories = [
    { id: 1, name: '头面颈部', icon: Activity, count: 36 },
    { id: 2, name: '躯干部', icon: Heart, count: 48 },
    { id: 3, name: '四肢部', icon: Activity, count: 72 }
  ]

  const hotAcupoints = [
    { id: 1, name: '合谷穴', category: '手阳明大肠经', effect: '镇痛、解表' },
    { id: 2, name: '足三里', category: '足阳明胃经', effect: '健脾和胃、强壮身体' },
    { id: 3, name: '关元穴', category: '任脉', effect: '培元固本、益气固脱' }
  ]

  return (
    <View className="min-h-screen bg-gray-50 pb-4">
      {/* 头部搜索区域 */}
      <View className="bg-gradient-to-b from-red-50 to-white p-4 pt-8 pb-6">
        <Text className="block text-2xl font-bold text-[#C23B34] mb-2">穴位通</Text>
        <Text className="block text-sm text-gray-600 mb-4">探索人体穴位的奥秘</Text>

        <View className="bg-white rounded-xl shadow-sm flex items-center px-4">
          <Search size={20} color="#999" className="mr-2" />
          <Input
            className="border-0 flex-1"
            placeholder="搜索穴位名称或功效"
          />
        </View>
      </View>

      {/* 分类入口 */}
      <View className="px-4 mb-6">
        <View className="flex justify-between items-center mb-3">
          <Text className="block text-lg font-semibold text-gray-900">穴位分类</Text>
          <View onClick={handleViewAll}>
            <Text className="block text-sm text-[#C23B34]">
              查看全部
            </Text>
          </View>
        </View>

        <View className="grid grid-cols-3 gap-3">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.id} className="p-4 flex flex-col items-center" onClick={handleViewAll}>
                <Icon size={32} color="#C23B34" />
                <Text className="block text-sm font-medium text-gray-900 mt-2">
                  {category.name}
                </Text>
                <Text className="block text-xs text-gray-500">{category.count}个穴位</Text>
              </Card>
            )
          })}
        </View>
      </View>

      {/* 热门穴位 */}
      <View className="px-4 mb-6">
        <View className="flex justify-between items-center mb-3">
          <Text className="block text-lg font-semibold text-gray-900">热门穴位</Text>
          <View onClick={handleViewAll}>
            <Text className="block text-sm text-[#C23B34]">
              查看全部
            </Text>
          </View>
        </View>

        <View className="space-y-3">
          {hotAcupoints.map((point) => (
            <Card key={point.id}>
              <CardContent className="p-4">
                <View className="flex justify-between items-start">
                  <View className="flex-1">
                    <Text className="block text-base font-semibold text-[#C23B34] mb-1">
                      {point.name}
                    </Text>
                    <Badge className="mb-2" variant="secondary">
                      {point.category}
                    </Badge>
                    <Text className="block text-sm text-gray-600">{point.effect}</Text>
                  </View>
                  <View className="ml-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePointDetail(point.id)}
                    >
                      详情
                    </Button>
                  </View>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      </View>
    </View>
  )
}

export default IndexPage
