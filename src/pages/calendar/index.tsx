'use client'
import { View,Text,Button } from '@tarojs/components'
import type React from 'react'
import { useState, useEffect } from 'react'
import './index.scss'

interface WorkoutData {
  id: string
  date: string
  name: string
  exercises: string[]
  duration: number // 分钟
  calories: number
  intensity: 'light' | 'medium' | 'heavy'
}

interface MonthStats {
  totalWorkouts: number
  totalDuration: number // 分钟
  totalCalories: number
  streak: number
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const [showFilter, setShowFilter] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([])
  const [monthStats, setMonthStats] = useState<MonthStats>({
    totalWorkouts: 0,
    totalDuration: 0,
    totalCalories: 0,
    streak: 0,
  })

  // 模拟数据
  useEffect(() => {
    const mockData: WorkoutData[] = [
      {
        id: '1',
        date: '2024-01-15',
        name: '胸肌训练',
        exercises: ['卧推', '飞鸟', '俯卧撑', '双杠臂屈伸'],
        duration: 60,
        calories: 320,
        intensity: 'heavy',
      },
      {
        id: '2',
        date: '2024-01-16',
        name: '有氧运动',
        exercises: ['跑步'],
        duration: 30,
        calories: 250,
        intensity: 'light',
      },
      {
        id: '3',
        date: '2024-01-18',
        name: '背部训练',
        exercises: ['引体向上', '划船', '硬拉'],
        duration: 75,
        calories: 380,
        intensity: 'heavy',
      },
      {
        id: '4',
        date: new Date().toISOString().split('T')[0], // 今天的数据
        name: '腿部训练',
        exercises: ['深蹲', '硬拉', '腿举'],
        duration: 90,
        calories: 450,
        intensity: 'heavy',
      },
    ]

    setWorkoutData(mockData)

    // 计算月度统计
    const stats = {
      totalWorkouts: mockData.length,
      totalDuration: mockData.reduce((sum, workout) => sum + workout.duration, 0),
      totalCalories: mockData.reduce((sum, workout) => sum + workout.calories, 0),
      streak: 5, // 模拟连续训练天数
    }
    setMonthStats(stats)
  }, [])

  // 获取当前月份的天数
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startWeekday = firstDay.getDay()

    const days:any = []

    // 添加上个月的日期
    const prevMonth = new Date(year, month - 1, 0)
    for (let i = startWeekday - 1; i >= 0; i--) {
      days.push({
        date: prevMonth.getDate() - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonth.getDate() - i),
      })
    }

    // 添加当前月的日期
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: new Date(year, month, day),
      })
    }

    // 添加下个月的日期
    const remainingDays = 42 - days.length
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, day),
      })
    }

    return days
  }

  // 获取指定日期的训练数据
  const getWorkoutForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return workoutData.filter((workout) => workout.date === dateStr)
  }

  // 切换月份
  const changeMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  // 选择日期
  const selectDate = (date: Date) => {
    setSelectedDate(date)
  }

  // 判断是否是今天
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // 判断是否是选中的日期
  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString()
  }

  // 获取训练强度指示器
  const getWorkoutIndicator = (date: Date) => {
    const workouts = getWorkoutForDate(date)
    if (workouts.length === 0) return null

    const totalIntensity = workouts.reduce((sum, workout) => {
      switch (workout.intensity) {
        case 'light':
          return sum + 1
        case 'medium':
          return sum + 2
        case 'heavy':
          return sum + 3
        default:
          return sum
      }
    }, 0)

    if (totalIntensity >= 6) return 'heavy'
    if (totalIntensity >= 3) return 'medium'
    return 'light'
  }

  // 格式化时间
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  // 添加训练记录
  const addWorkout = () => {
    // 这里可以跳转到添加训练记录页面
    alert('跳转到添加训练记录页面')
  }

  const days = getDaysInMonth(currentDate)
  const selectedWorkouts = getWorkoutForDate(selectedDate)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  const filterOptions = [
    { key: 'all', label: '全部' },
    { key: 'strength', label: '力量' },
    { key: 'cardio', label: '有氧' },
    { key: 'chest', label: '胸肌' },
    { key: 'back', label: '背部' },
    { key: 'legs', label: '腿部' },
  ]

  return (
    <View className='calendar-container'>
      {/* 顶部功能区 */}
      <View className='header'>
        {/* 月份导航 */}
        <View className='month-nav'>
          <Button className='nav-btn' onClick={() => changeMonth('prev')}>
            ‹
          </Button>
          <Text className='month-title'>
            {currentDate.getFullYear()}年{currentDate.getMonth() + 1}月
          </Text>
          <Button className='nav-btn' onClick={() => changeMonth('next')}>
            ›
          </Button>
        </View>

        {/* 视图切换器 */}
        <View className='view-switcher'>
          <Button className={`switch-btn ${viewMode === 'month' ? 'active' : ''}`} onClick={() => setViewMode('month')}>
            月
          </Button>
          <Button className={`switch-btn ${viewMode === 'week' ? 'active' : ''}`} onClick={() => setViewMode('week')}>
            周
          </Button>
        </View>

        {/* 月度统计 */}
        <View className='stats-row'>
          <View className='stat-item'>
            <View className='stat-number'>{monthStats.totalWorkouts}</View>
            <View className='stat-label'>训练天数</View>
          </View>
          <View className='stat-item'>
            <View className='stat-number'>{formatDuration(monthStats.totalDuration)}</View>
            <View className='stat-label'>总时长</View>
          </View>
          <View className='stat-item'>
            <View className='stat-number'>{monthStats.totalCalories}</View>
            <View className='stat-label'>消耗卡路里</View>
          </View>
        </View>
      </View>

      {/* 筛选按钮 */}
      <Button className='filter-btn' onClick={() => setShowFilter(!showFilter)}>
        ⚙
      </Button>

      {/* 连续训练天数徽章 */}
      <View className='streak-badge'>连续 {monthStats.streak} 天</View>

      {/* 筛选下拉菜单 */}
      {showFilter && (
        <View className='filter-dropdown'>
          {filterOptions.map((option) => (
            <View
              key={option.key}
              className={`filter-item ${filterType === option.key ? 'active' : ''}`}
              onClick={() => {
                setFilterType(option.key)
                setShowFilter(false)
              }}
            >
              {option.label}
            </View>
          ))}
        </View>
      )}

      {/* 核心日历显示区 */}
      {viewMode === 'month' ? (
        <View className='calendar-grid'>
          {/* 星期标题 */}
          <View className='weekdays'>
            {weekdays.map((day) => (
              <View key={day} className='weekday'>
                {day}
              </View>
            ))}
          </View>

          {/* 日期网格 */}
          <View className='days-grid'>
            {days.map((day, index) => {
              const indicator = getWorkoutIndicator(day.fullDate)
              return (
                <View key={index} className='day-cell' onClick={() => selectDate(day.fullDate)}>
                  <View
                    className={`day-content ${isToday(day.fullDate) ? 'today' : ''} ${
                      isSelected(day.fullDate) ? 'selected' : ''
                    } ${!day.isCurrentMonth ? 'other-month' : ''}`}
                  >
                    <Text className='day-number'>{day.date}</Text>
                    {indicator && <View className={`workout-indicator ${indicator}`} />}
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      ) : (
        // 周视图
        <View className='week-view'>
          <View className='week-card'>
            <View className='week-date'>本周训练概览</View>
            <View className='week-summary'>胸肌训练：卧推等4个动作</View>
            <View className='week-stats'>
              <View className='week-stat'>
                <View className='week-stat-number'>3</View>
                <View className='week-stat-label'>训练次数</View>
              </View>
              <View className='week-stat'>
                <View className='week-stat-number'>2.5h</View>
                <View className='week-stat-label'>总时长</View>
              </View>
              <View className='week-stat'>
                <View className='week-stat-number'>950</View>
                <View className='week-stat-label'>卡路里</View>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* 底部每日详情面板 */}
      <View className='detail-panel'>
        <View className='panel-header'>
          <View className='panel-title'>{selectedWorkouts.length > 0 ? '训练记录' : '休息日'}</View>
          <View className='panel-date'>
            {selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
          </View>
        </View>

        <View className='panel-content'>
          {selectedWorkouts.length > 0 ? (
            selectedWorkouts.map((workout) => (
              <View key={workout.id} className='workout-item'>
                <View className='workout-name'>{workout.name}</View>
                <View className='workout-details'>
                  {workout.exercises.join('、')} · {formatDuration(workout.duration)} · {workout.calories}卡路里
                </View>
              </View>
            ))
          ) : (
            <View className='no-workout'>
              <View className='no-workout-text'>今天还没有训练记录</View>
              <Button className='add-workout-btn' onClick={addWorkout}>
                添加训练记录
              </Button>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default Calendar
