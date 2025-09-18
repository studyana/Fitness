import { View, Text } from '@tarojs/components';
// import './FloatingActionButton.scss'

interface FloatingActionButtonProps {
  onPress: () => void
}

export default function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <View className='fab-container' onClick={onPress}>
      <Text className='fab-icon'>+</Text>
    </View>
  )
}
