import { View,Text } from '@tarojs/components';
import './DataCards.scss'

interface Record {
  id: number
  name: string
  weight: string
  reps: string
  sets: string
}

interface DataCardsProps {
  records: Record[]
  chartData: number[]
}

export default function DataCards({ records, chartData }: DataCardsProps) {
  return (
    <View className='data-cards-container'>
      {/* 今日记录卡片 */}
      <View className='data-card'>
        <Text className='card-title'>今日训练</Text>
        <View className='records-list'>
          {records.map((record) => (
            <View key={record.id} className='record-item'>
              <Text className='record-name'>{record.name}</Text>
              <View className='record-details'>
                <Text className='record-detail'>{record.weight}</Text>
                <Text className='record-detail'>{record.reps}次</Text>
                <Text className='record-detail'>{record.sets}组</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 趋势图卡片 */}
      <View className='data-card'>
        <Text className='card-title'>7天训练趋势</Text>
        <View className='chart-container'>
          <View className='chart-bars'>
            {chartData.map((value, index) => (
              <View key={index} className='chart-bar-wrapper'>
                <View className='chart-bar' style={{ height: `${(value / 100) * 60}px` }} />
                <Text className='chart-label'>{['一', '二', '三', '四', '五', '六', '日'][index]}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 成就提示卡片 */}
      <View className='data-card achievement-card'>
        <Text className='card-title'>今日成就</Text>
        <View className='achievement-content'>
          <Text className='achievement-icon'>🏆</Text>
          <View className='achievement-text'>
            <Text className='achievement-title'>连续训练3天</Text>
            <Text className='achievement-desc'>坚持就是胜利！</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
