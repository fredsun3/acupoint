import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Search, Loader } from 'lucide-react-taro'
import { Network } from '@/network'
import './index.css'

interface Acupoint {
  id: string
  name: string
  category: string
  image: string
  position: string
  location: string
  effects: string[]
  acupuncture: string
  moxibustion: string
  precautions: string[]
}

const AcupointsPage = () => {
  const [allPoints, setAllPoints] = useState<Acupoint[]>([])
  const [filteredPoints, setFilteredPoints] = useState<Acupoint[]>([])
  const [loading, setLoading] = useState(true)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  // 从后端获取穴位数据
  const fetchAcupoints = async () => {
    try {
      setLoading(true)
      const res = await Network.request({
        url: '/api/acupoints'
      })

      console.log('穴位数据:', res.data)

      if (res.data && res.data.data) {
        setAllPoints(res.data.data)
        setFilteredPoints(res.data.data)
      }
    } catch (error) {
      console.error('获取穴位数据失败:', error)
      Taro.showToast({
        title: '加载失败，请重试',
        icon: 'none'
      })
    } finally {
      setLoading(false)
    }
  }

  // 搜索穴位
  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword)

    if (!keyword.trim()) {
      filterByCategory(activeTab)
      return
    }

    const filtered = allPoints.filter(point =>
      point.name.includes(keyword) ||
      point.category.includes(keyword)
    )
    setFilteredPoints(filtered)
  }

  // 按分类筛选
  const filterByCategory = (category: string) => {
    setActiveTab(category)

    if (category === 'all') {
      const filtered = searchKeyword
        ? allPoints.filter(point =>
            point.name.includes(searchKeyword) ||
            point.category.includes(searchKeyword)
          )
        : allPoints
      setFilteredPoints(filtered)
      return
    }

    // 根据头面、躯干、四肢分类
    let categoryPoints: Acupoint[] = []
    if (category === 'head') {
      // 头面部：任脉、督脉的头部穴位、经外奇穴
      categoryPoints = allPoints.filter(point =>
        ['百会', '太阳', '迎香', '风池'].some(key => point.name.includes(key))
      )
    } else if (category === 'trunk') {
      // 躯干部：胸腹部穴位
      categoryPoints = allPoints.filter(point =>
        ['关元', '中脘', '神阙', '膻中', '气海', '中极', '命门'].some(key => point.name.includes(key))
      )
    } else if (category === 'limbs') {
      // 四肢部：四肢穴位
      categoryPoints = allPoints.filter(point =>
        ['合谷', '曲池', '内关', '神门', '足三里', '三阴交', '太冲', '涌泉', '腰阳关'].some(key => point.name.includes(key))
      )
    }

    const filtered = searchKeyword
      ? categoryPoints.filter(point =>
          point.name.includes(searchKeyword) ||
          point.category.includes(searchKeyword)
        )
      : categoryPoints

    setFilteredPoints(filtered)
  }

  // 跳转到详情页
  const handleDetail = (id: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }

  // 页面加载时获取数据
  useEffect(() => {
    fetchAcupoints()
  }, [])

  return (
    <View className="min-h-screen bg-gray-50 pb-4">
      {/* 搜索区域 */}
      <View className="bg-white p-4">
        <View className="flex items-center">
          <Search size={20} color="#999" className="mr-2" />
          <View className="flex-1">
            <Input
              className="w-full rounded-xl"
              placeholder="搜索穴位名称或经络"
              value={searchKeyword}
              onInput={(e) => handleSearch(e.detail.value)}
            />
          </View>
        </View>
      </View>

      {/* 分类切换 */}
      <Tabs defaultValue="all" onValueChange={filterByCategory}>
        <TabsList className="grid grid-cols-3 w-full mx-4 mb-4">
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="head">头面颈</TabsTrigger>
          <TabsTrigger value="trunk">躯干</TabsTrigger>
          <TabsTrigger value="limbs">四肢</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <View className="px-4 space-y-3">
            {loading ? (
              <View className="flex justify-center py-12">
                <Loader size={24} className="animate-spin" color="#C23B34" />
                <Text className="block ml-2 text-gray-500">加载中...</Text>
              </View>
            ) : filteredPoints.length === 0 ? (
              <View className="flex flex-col items-center justify-center py-12">
                <Text className="block text-gray-500">暂无数据</Text>
              </View>
            ) : (
              filteredPoints.map((point) => (
                <Card key={point.id} className="cursor-pointer">
                  <CardHeader>
                    <View className="flex justify-between items-start">
                      <CardTitle className="text-lg text-[#C23B34]">
                        {point.name}
                      </CardTitle>
                      <Badge className="bg-[#E8D4A8] text-[#8B4513]">
                        {point.category}
                      </Badge>
                    </View>
                  </CardHeader>
                  <CardContent>
                    <Text className="block text-sm text-gray-600 mb-2">
                      {point.location}
                    </Text>
                    {point.effects.length > 0 && (
                      <View className="flex flex-wrap gap-1 mt-2">
                        {point.effects.slice(0, 2).map((effect, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {effect.split('：')[0]}
                          </Badge>
                        ))}
                      </View>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#C23B34] text-white hover:bg-[#A32822]"
                      onClick={() => handleDetail(point.id)}
                    >
                      查看详情
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </View>
        </TabsContent>
      </Tabs>

      {/* 统计信息 */}
      {filteredPoints.length > 0 && (
        <View className="px-4 mt-4">
          <Text className="block text-center text-sm text-gray-500">
            共 {filteredPoints.length} 个穴位
          </Text>
        </View>
      )}
    </View>
  )
}

export default AcupointsPage
