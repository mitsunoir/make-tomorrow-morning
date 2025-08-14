import { useState } from 'react'
import TaskSettingScreen from './components/TaskSettingScreen'
import ReminderScreen from './components/ReminderScreen'
import CompletedTasksScreen from './components/CompletedTasksScreen'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState<'setting' | 'reminder' | 'completed'>('setting')

  return (
    <div className="App">
      {/* デモ用の画面切り替えボタン */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setCurrentScreen('setting')}
          className={`px-3 py-2 rounded-lg text-xs font-medium ${
            currentScreen === 'setting'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          タスク設定
        </button>
        <button
          onClick={() => setCurrentScreen('reminder')}
          className={`px-3 py-2 rounded-lg text-xs font-medium ${
            currentScreen === 'reminder'
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          リマインド
        </button>
        <button
          onClick={() => setCurrentScreen('completed')}
          className={`px-3 py-2 rounded-lg text-xs font-medium ${
            currentScreen === 'completed'
              ? 'bg-emerald-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
        >
          完了一覧
        </button>
      </div>

      {currentScreen === 'setting' && <TaskSettingScreen />}
      {currentScreen === 'reminder' && <ReminderScreen />}
      {currentScreen === 'completed' && <CompletedTasksScreen />}
    </div>
  )
}

export default App