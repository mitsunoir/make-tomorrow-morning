import { Moon, Sun, Trophy } from 'lucide-react'

interface TopNavigationProps {
  currentScreen: 'setting' | 'reminder' | 'completed'
  onScreenChange: (screen: 'setting' | 'reminder' | 'completed') => void
}

const TopNavigation = ({ currentScreen, onScreenChange }: TopNavigationProps) => {
  const navItems = [
    {
      id: 'setting' as const,
      label: 'タスク設定',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      activeColor: 'bg-indigo-500',
      hoverColor: 'hover:bg-indigo-50 hover:text-indigo-600'
    },
    {
      id: 'reminder' as const,
      label: 'リマインド',
      icon: Sun,
      color: 'from-orange-500 to-yellow-500',
      activeColor: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-50 hover:text-orange-600'
    },
    {
      id: 'completed' as const,
      label: '完了一覧',
      icon: Trophy,
      color: 'from-emerald-500 to-teal-500',
      activeColor: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-50 hover:text-emerald-600'
    }
  ]

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ・タイトル */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌅</div>
            <h1 className="text-xl font-bold text-gray-800">
              朝活アプリ
            </h1>
          </div>

          {/* ナビゲーション */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentScreen === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => onScreenChange(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-md`
                      : `text-gray-600 ${item.hoverColor}`
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNavigation