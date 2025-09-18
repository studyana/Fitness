'use client'
import { View, Text } from '@tarojs/components';
import './QuickActions.scss'

export default function QuickActions() {
  const quickActions = [
    { id: 1, name: '卧推', icon: '💪' },
    { id: 2, name: '深蹲', icon: '🏋️' },
    { id: 3, name: '硬拉', icon: '🏃' },
    { id: 4, name: '引体向上', icon: '🤸' },
    { id: 5, name: '俯卧撑', icon: '💪' },
    { id: 6, name: '跑步', icon: '🏃' },
  ]

  const handleActionPress = (action: any) => {
    console.log('选择动作:', action.name)
  }

  return (
    <View className='quick-actions-container'>
      <Text className='section-title'>常用动作</Text>
      <View
        className='actions-scroll'
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <View className='actions-list'>
          {quickActions.map((action) => (
            <View key={action.id} className='action-card' onClick={() => handleActionPress(action)}>
              <Text className='action-icon'>{action.icon}</Text>
              <Text className='action-name'>{action.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}
