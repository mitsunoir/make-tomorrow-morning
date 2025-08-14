import { useState, useEffect } from 'react'
import { Sun, Clock, CheckCircle2, Calendar, Coffee } from 'lucide-react'
import { taskService, type Task } from '../lib/database'

const ReminderScreen = () => {
  const [todayTasks, setTodayTasks] = useState<Task[]>([])
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [actionMessage, setActionMessage] = useState('')

  useEffect(() => {
    loadTodayTasks()
  }, [])

  const loadTodayTasks = async () => {
    try {
      const tasks = await taskService.getTodayTasks()
      // 未完了タスクのみをフィルタリング (0 = false)
      const incompleteTasks = tasks.filter(task => task.isCompleted === 0)
      // 最新のタスクを先頭に
      incompleteTasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setTodayTasks(incompleteTasks)
    } catch (error) {
      console.error('タスク読み込みエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const currentTask = todayTasks[currentTaskIndex]

  const handleComplete = async () => {
    if (!currentTask) return
    
    try {
      await taskService.completeTask(currentTask.id!)
      setActionMessage('お疲れさまでした！ 🎉')
      
      // 次のタスクに移動または完了
      if (currentTaskIndex < todayTasks.length - 1) {
        setTimeout(() => {
          setCurrentTaskIndex(prev => prev + 1)
          setActionMessage('')
        }, 2000)
      } else {
        setTimeout(() => {
          setActionMessage('今日の朝活は全て完了です！素晴らしい！ ✨')
        }, 2000)
      }
    } catch (error) {
      console.error('タスク完了エラー:', error)
      setActionMessage('エラーが発生しました')
    }
  }

  const handlePostpone = async () => {
    if (!currentTask) return
    
    try {
      await taskService.postponeTask(currentTask.id!)
      setActionMessage('明日に延期しました')
      
      // 次のタスクに移動
      if (currentTaskIndex < todayTasks.length - 1) {
        setTimeout(() => {
          setCurrentTaskIndex(prev => prev + 1)
          setActionMessage('')
        }, 1500)
      } else {
        setTimeout(() => {
          setActionMessage('今日のタスクは全て処理されました')
        }, 1500)
      }
    } catch (error) {
      console.error('タスク延期エラー:', error)
      setActionMessage('エラーが発生しました')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-300 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="text-lg font-medium text-gray-700">朝活タスクを読み込み中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (todayTasks.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-300 p-6">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Sun size={32} />
              <h1 className="text-2xl font-bold">おはよう！</h1>
            </div>
          </div>
          
          <div className="p-8 text-center">
            <Coffee size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              今日のタスクはありません
            </h2>
            <p className="text-gray-600">
              昨夜タスクを設定して、<br />
              明日の朝活を始めましょう！
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-amber-300 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sun size={32} />
            <h1 className="text-2xl font-bold">おはよう！</h1>
          </div>
          <p className="text-orange-100 text-lg">今日の朝活はこれ！</p>
          
          {/* プログレス表示 */}
          {todayTasks.length > 1 && (
            <div className="mt-3 flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">
                {currentTaskIndex + 1} / {todayTasks.length} 個目
              </span>
            </div>
          )}
        </div>

        <div className="p-8">
          {/* 現在時刻 */}
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Clock size={20} />
            <span className="text-lg font-medium">
              {new Date().toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          {/* アクションメッセージ */}
          {actionMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <span className="text-green-700 font-medium">{actionMessage}</span>
            </div>
          )}

          {/* タスク表示 */}
          {currentTask && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 rounded-full p-2 mt-1">
                  <CheckCircle2 size={20} className="text-white" />
                </div>
                <div>
                  <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">
                    TODAY'S TASK
                  </span>
                  <h2 className="text-2xl font-bold text-gray-800 mt-1">
                    📌 {currentTask.title}
                  </h2>
                  <span className="text-xs text-gray-500 mt-2 block">
                    {currentTask.type === 'custom' ? 'カスタム' : '定型タスク'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="space-y-4">
            <button
              onClick={handleComplete}
              disabled={!!actionMessage}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:cursor-not-allowed"
            >
              やった！ 🎉
            </button>
            
            <button
              onClick={handlePostpone}
              disabled={!!actionMessage}
              className="w-full py-3 bg-gray-100 text-gray-700 font-medium text-lg rounded-2xl hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              延期する
            </button>
          </div>

          {/* 励ましメッセージ */}
          {!actionMessage && (
            <div className="mt-8 text-center">
              <p className="text-gray-600 text-sm leading-relaxed">
                小さな一歩でも、続けることで<br />
                大きな変化につながります ✨
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReminderScreen