import { useState } from 'react'
import { Moon, Check, Save } from 'lucide-react'
import { taskService } from '../lib/database'

const TaskSettingScreen = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [customTask, setCustomTask] = useState('')
  const [inputMode, setInputMode] = useState<'list' | 'custom'>('list')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

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

  const handleConfirm = async () => {
    setIsSaving(true)
    setSaveMessage('')
    
    try {
      const taskTitles = inputMode === 'list' ? selectedTasks : [customTask]
      const tasksToSave = taskTitles.map(title => ({
        title,
        type: inputMode === 'list' ? 'predefined' as const : 'custom' as const,
        isCompleted: 0 // number型: 0 = false, 1 = true
      }))

      await taskService.saveTomorrowTasks(tasksToSave)
      setSaveMessage('明日の朝活タスクを保存しました！')
      
      // 成功後にフォームをリセット
      setSelectedTasks([])
      setCustomTask('')
    } catch (error) {
      console.error('タスク保存エラー:', error)
      setSaveMessage('保存に失敗しました。もう一度お試しください。')
    } finally {
      setIsSaving(false)
      // 3秒後にメッセージを消す
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 p-4 md:p-6">
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

          {/* 保存メッセージ */}
          {saveMessage && (
            <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
              saveMessage.includes('失敗')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {saveMessage}
            </div>
          )}

          {/* 確定ボタン */}
          <button
            onClick={handleConfirm}
            disabled={
              isSaving ||
              (inputMode === 'list' && selectedTasks.length === 0) ||
              (inputMode === 'custom' && customTask.trim() === '')
            }
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                保存中...
              </>
            ) : (
              <>
                <Save size={20} />
                確定する
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskSettingScreen