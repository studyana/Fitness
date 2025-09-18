
import { View,Text } from '@tarojs/components';
// import './Header.scss'

interface HeaderProps {
  date: string
  weekday: string
}

export default function Header({ date, weekday }: HeaderProps) {
  return (
    <View
      className='header-container'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 20px 32px',
        background: 'linear-gradient(135deg, #22c55e, #4ade80)',
        borderRadius: '0 0 32px 32px',
        marginBottom: '24px',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.2)',
      }}
    >
      <Text
        className='date-text'
        style={{
          fontSize: '32px',
          fontWeight: '800',
          marginBottom: '6px',
          color: '#1e293b',
          letterSpacing: '-0.5px',
          textShadow: '0 1px 3px rgba(255,255,255,0.8)',
        }}
      >
        {date}
      </Text>
      <Text
        className='weekday-text'
        style={{
          fontSize: '18px',
          color: '#334155',
          fontWeight: '500',
          textShadow: '0 1px 2px rgba(255,255,255,0.8)',
        }}
      >
        {weekday}
      </Text>
    </View>
  )
}
