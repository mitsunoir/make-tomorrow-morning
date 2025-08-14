import { useState } from 'react'
import TaskSettingScreen from './components/TaskSettingScreen'
import ReminderScreen from './components/ReminderScreen'
import CompletedTasksScreen from './components/CompletedTasksScreen'
import BottomNavigation from './components/BottomNavigation'
import TopNavigation from './components/TopNavigation'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState<'setting' | 'reminder' | 'completed'>('setting')

  return (
    <div className="App min-h-screen bg-gray-50">
      {/* PC用上部ナビゲーション (md以上で表示) */}
      <div className="hidden md:block">
        <TopNavigation 
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
        />
      </div>

      {/* メインコンテンツ */}
      <div className="pb-20 md:pb-0"> {/* モバイル時のみボトムナビ分の余白 */}
        {currentScreen === 'setting' && <TaskSettingScreen />}
        {currentScreen === 'reminder' && <ReminderScreen />}
        {currentScreen === 'completed' && <CompletedTasksScreen />}
      </div>

      {/* モバイル用ボトムナビゲーション (md未満で表示) */}
      <div className="md:hidden">
        <BottomNavigation 
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
        />
      </div>
    </div>
  )
}

export default App