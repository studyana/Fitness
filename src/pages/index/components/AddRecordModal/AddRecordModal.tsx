'use client'
import { View, Text } from '@tarojs/components';
// import './AddRecordModal.scss'


interface AddRecordModalProps {
  visible: boolean
  onClose: () => void
}

export default function AddRecordModal({ visible, onClose }: AddRecordModalProps) {
  const recordTypes = [
    { id: 1, name: '力量训练', icon: '💪', color: 'var(--color-primary)' },
    { id: 2, name: '有氧运动', icon: '🏃', color: 'var(--color-secondary)' },
    { id: 3, name: '拉伸放松', icon: '🧘', color: 'var(--color-chart-3)' },
    { id: 4, name: '体重记录', icon: '⚖️', color: 'var(--color-chart-4)' },
  ]

  const handleTypeSelect = (type: any) => {
    console.log('选择记录类型:', type.name)
    onClose()
  }

  if (!visible) return null

  return (
    <View className='modal-overlay' onClick={onClose}>
      <View className='modal-content' onClick={(e) => e.stopPropagation()}>
        <View className='modal-header'>
          <Text className='modal-title'>添加记录</Text>
          <View className='modal-close' onClick={onClose}>
            <Text className='close-icon'>×</Text>
          </View>
        </View>

        <View className='modal-body'>
          <Text className='modal-subtitle'>选择记录类型</Text>
          <View className='type-grid'>
            {recordTypes.map((type) => (
              <View key={type.id} className='type-card' onClick={() => handleTypeSelect(type)}>
                <Text className='type-icon'>{type.icon}</Text>
                <Text className='type-name'>{type.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}
