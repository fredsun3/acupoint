import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { BookA, Share2, Settings, FileText } from 'lucide-react-taro'


const ProfilePage = () => {
  useLoad(() => {
    console.log('我的页面加载')
  })

  return (
    <View className="min-h-screen bg-gray-50 pb-4">
      {/* 用户信息 */}
      <View className="bg-gradient-to-b from-red-50 to-white p-4 pt-8 pb-6">
        <View className="flex items-center mb-4">
          <Avatar className="w-16 h-16 mr-4">
            <View className="w-full h-full bg-[#C23B34] rounded-full flex items-center justify-center">
              <Text className="text-white text-xl font-bold">用</Text>
            </View>
          </Avatar>
          <View className="flex-1">
            <Text className="block text-xl font-bold text-gray-900">未登录</Text>
            <Text className="block text-sm text-gray-600 mt-1">登录后享受更多功能</Text>
          </View>
          <Button size="sm">登录</Button>
        </View>
      </View>

      {/* 功能入口 */}
      <View className="px-4 space-y-3">
        <Card>
          <CardContent className="p-4">
            <View className="space-y-4">
              <View className="flex items-center justify-between">
                <View className="flex items-center">
                  <BookA size={20} color="#C23B34" className="mr-3" />
                  <Text className="block text-base text-gray-900">我的收藏</Text>
                </View>
                <Text className="block text-sm text-gray-500">0</Text>
              </View>

              <View className="flex items-center justify-between">
                <View className="flex items-center">
                  <FileText size={20} color="#7CB342" className="mr-3" />
                  <Text className="block text-base text-gray-900">我的笔记</Text>
                </View>
                <Text className="block text-sm text-gray-500">0</Text>
              </View>

              <View className="flex items-center justify-between">
                <View className="flex items-center">
                  <Share2 size={20} color="#FFA000" className="mr-3" />
                  <Text className="block text-base text-gray-900">分享记录</Text>
                </View>
                <Text className="block text-sm text-gray-500">0</Text>
              </View>
            </View>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <View className="flex items-center justify-between">
              <View className="flex items-center">
                <Settings size={20} color="#666" className="mr-3" />
                <Text className="block text-base text-gray-900">设置</Text>
              </View>
              <Text className="block text-sm text-gray-500">{">"}</Text>
            </View>
          </CardContent>
        </Card>
      </View>
    </View>
  )
}

export default ProfilePage
