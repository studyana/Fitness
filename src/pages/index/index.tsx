import { View } from '@tarojs/components';
import { useState } from 'react'
import Header from './components/Header/Header'
import ProgressRing from './components/ProgressRing/ProgressRing'
import QuickActions from './components/QuickActions/QuickActions'
import DataCards from './components/DataCards/DataCards'
import FloatingActionButton from './components/FloatingActionButton/FloatingActionButton'
import AddRecordModal from './components/AddRecordModal/AddRecordModal'

export default function Index() {
  const [showModal, setShowModal] = useState(false)

  // 模拟数据
  const todayData = {
    date: '2023年11月2日',
    weekday: '星期四',
    progress: 75, // 训练目标完成度
    duration: 45, // 运动时长（分钟）
    calories: 320, // 消耗卡路里
    records: [
      { id: 1, name: '卧推', weight: '80kg', reps: '12', sets: '3' },
      { id: 2, name: '深蹲', weight: '100kg', reps: '10', sets: '4' },
      { id: 3, name: '硬拉', weight: '120kg', reps: '8', sets: '3' },
    ],
  }

  const chartData = [65, 70, 45, 80, 75, 85, 75] // 近7天训练量

  const handleAddRecord = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <View className='index-page'>
      <View
        className='page-container'
        style={{
          height: '100vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* 头部概要区域 */}
        <Header date={todayData.date} weekday={todayData.weekday} />

        {/* 进度环和关键指标 */}
        <View className='stats-section'>
          <ProgressRing progress={todayData.progress} duration={todayData.duration} calories={todayData.calories} />
        </View>

        {/* 快速操作栏 */}
        <QuickActions />

        {/* 数据卡片区域 */}
        <DataCards records={todayData.records} chartData={chartData} />
      </View>

      {/* 悬浮操作按钮 */}
      <FloatingActionButton onPress={handleAddRecord} />

      {/* 添加记录模态框 */}
      <AddRecordModal visible={showModal} onClose={handleCloseModal} />
    </View>
  )
}
