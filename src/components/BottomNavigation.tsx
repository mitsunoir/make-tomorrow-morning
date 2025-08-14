import { Moon, Sun, Trophy } from 'lucide-react'

interface BottomNavigationProps {
  currentScreen: 'setting' | 'reminder' | 'completed'
  onScreenChange: (screen: 'setting' | 'reminder' | 'completed') => void
}

const BottomNavigation = ({ currentScreen, onScreenChange }: BottomNavigationProps) => {
  const navItems = [
    {
      id: 'setting' as const,
      label: 'タスク設定',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-500'
    },
    {
      id: 'reminder' as const,
      label: 'リマインド',
      icon: Sun,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'bg-orange-500'
    },
    {
      id: 'completed' as const,
      label: '完了一覧',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-500'
    }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-padding-bottom z-50">
      <div className="flex justify-around items-center px-2 py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-0 flex-1 mx-1 transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon 
                size={24} 
                className={`mb-1 ${
                  isActive ? 'drop-shadow-sm' : ''
                }`} 
              />
              <span className={`text-xs font-medium leading-tight ${
                isActive ? 'text-white' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation