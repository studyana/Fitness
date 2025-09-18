import { View, Text } from '@tarojs/components';
import './ProgressRing.scss'

interface ProgressRingProps {
  progress: number
  duration: number
  calories: number
}

export default function ProgressRing({ progress, duration, calories }: ProgressRingProps) {
  const circumference = 2 * Math.PI * 45 // 半径45的圆周长
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <View className='progress-container'>
      <View className='progress-ring-wrapper'>
        <svg className='progress-ring' width='120' height='120'>
          <circle
            className='progress-ring-background'
            cx='60'
            cy='60'
            r='45'
            fill='transparent'
            stroke='var(--color-border)'
            strokeWidth='8'
          />
          <circle
            className='progress-ring-progress'
            cx='60'
            cy='60'
            r='45'
            fill='transparent'
            stroke='var(--color-primary)'
            strokeWidth='8'
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap='round'
            transform='rotate(-90 60 60)'
          />
        </svg>
        <View className='progress-text'>
          <Text className='progress-percentage'>{progress}%</Text>
          <Text className='progress-label'>目标完成</Text>
        </View>
      </View>

      <View className='stats-row'>
        <View className='stat-item'>
          <Text className='stat-value'>{duration}</Text>
          <Text className='stat-label'>分钟</Text>
        </View>
        <View className='stat-item'>
          <Text className='stat-value'>{calories}</Text>
          <Text className='stat-label'>kcal</Text>
        </View>
      </View>
    </View>
  )
}
