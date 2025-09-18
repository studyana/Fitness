import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';

export default function Profile() {
  useLoad(() => {
    console.log('Profile page loaded.');
  });

  return (
    <View className='profile'>
      <View className='profile-header'>
        <Text className='title'>我的</Text>
      </View>
      <View className='profile-content'>
        <Text className='placeholder'>个人中心功能开发中...</Text>
      </View>
    </View>
  );
}
