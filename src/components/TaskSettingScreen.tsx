import { useState } from 'react'
import { Moon, Check } from 'lucide-react'

const TaskSettingScreen = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [customTask, setCustomTask] = useState('')
  const [inputMode, setInputMode] = useState<'list' | 'custom'>('list')

  const predefinedTasks = [
    '美術館に行く',
    '朝カフェで読書',
    '朝ラン 3km',
    '物件条件リスト作成',
    '早朝散歩',
    'ヨガ・ストレッチ',
    '資格勉強',
    '日記を書く'
  ]

  const handleTaskToggle = (task: string) => {
    setSelectedTasks(prev => 
      prev.includes(task)
        ? prev.filter(t => t !== task)
        : [...prev, task]
    )
  }

  const handleConfirm = () => {
    const tasks = inputMode === 'list' ? selectedTasks : [customTask]
    console.log('確定されたタスク:', tasks)
    // ここで実際の保存処理を実装
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Moon size={32} />
            <h1 className="text-2xl font-bold">明日の朝、何をやる？</h1>
          </div>
        </div>

        <div className="p-6">
          {/* モード選択 */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setInputMode('list')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                inputMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              リストから選ぶ
            </button>
            <button
              onClick={() => setInputMode('custom')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                inputMode === 'custom'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              自由入力
            </button>
          </div>

          {/* リストモード */}
          {inputMode === 'list' && (
            <div className="space-y-3 mb-6">
              {predefinedTasks.map((task) => (
                <label
                  key={task}
                  className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-100 hover:border-blue-200 cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task)}
                      onChange={() => handleTaskToggle(task)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      selectedTasks.includes(task)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedTasks.includes(task) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-gray-800 font-medium">{task}</span>
                </label>
              ))}
            </div>
          )}

          {/* カスタム入力モード */}
          {inputMode === 'custom' && (
            <div className="mb-6">
              <textarea
                value={customTask}
                onChange={(e) => setCustomTask(e.target.value)}
                placeholder="やりたいことを入力してください..."
                className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-32 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          {/* 確定ボタン */}
          <button
            onClick={handleConfirm}
            disabled={
              (inputMode === 'list' && selectedTasks.length === 0) ||
              (inputMode === 'custom' && customTask.trim() === '')
            }
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            確定する
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskSettingScreen