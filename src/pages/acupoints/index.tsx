import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react-taro'
import './index.css'

const AcupointsPage = () => {
  useLoad(() => {
    console.log('穴位库页面加载')
  })

  return (
    <View className="min-h-screen bg-gray-50 pb-4">
      {/* 搜索区域 */}
      <View className="bg-white p-4 flex items-center">
        <Search size={20} color="#999" className="mr-2" />
        <Input className="rounded-xl flex-1" placeholder="搜索穴位名称" />
      </View>

      {/* 分类切换 */}
      <Tabs defaultValue="head" className="mt-2">
        <TabsList className="grid grid-cols-3 w-full mx-4 mb-4">
          <TabsTrigger value="head">头面颈</TabsTrigger>
          <TabsTrigger value="trunk">躯干</TabsTrigger>
          <TabsTrigger value="limbs">四肢</TabsTrigger>
        </TabsList>

        <TabsContent value="head">
          <View className="px-4 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>百会穴</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="mb-2">督脉</Badge>
                <Text className="block text-sm text-gray-600">
                  位于头顶正中线与两耳尖连线的交点处
                </Text>
              </CardContent>
            </Card>
          </View>
        </TabsContent>

        <TabsContent value="trunk">
          <View className="px-4">
            <Text className="block text-center text-gray-500 py-8">
              暂无数据
            </Text>
          </View>
        </TabsContent>

        <TabsContent value="limbs">
          <View className="px-4">
            <Text className="block text-center text-gray-500 py-8">
              暂无数据
            </Text>
          </View>
        </TabsContent>
      </Tabs>
    </View>
  )
}

export default AcupointsPage
