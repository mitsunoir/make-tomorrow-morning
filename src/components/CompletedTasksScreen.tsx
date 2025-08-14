import { useState, useEffect } from 'react'
import { CheckCircle2, Calendar, Clock, Trophy, Coffee } from 'lucide-react'
import { taskService, type Task } from '../lib/database'

const CompletedTasksScreen = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCompletedTasks()
  }, [])

  const loadCompletedTasks = async () => {
    try {
      const tasks = await taskService.getCompletedTasks()
      setCompletedTasks(tasks)
    } catch (error) {
      console.error('完了済みタスク読み込みエラー:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getTaskIcon = (type: string) => {
    return type === 'custom' ? '✍️' : '📋'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-4 md:p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            <span className="text-lg font-medium text-gray-700">完了済みタスクを読み込み中...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Trophy size={32} />
              <h1 className="text-2xl font-bold">完了済み朝活</h1>
            </div>
            <p className="text-emerald-100 text-lg">これまでの頑張りを振り返りましょう</p>
            <div className="mt-3 flex items-center gap-2">
              <CheckCircle2 size={16} />
              <span className="text-sm">
                完了数: {completedTasks.length} 件
              </span>
            </div>
          </div>
        </div>

        {/* タスク一覧 */}
        {completedTasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <Coffee size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              まだ完了したタスクがありません
            </h2>
            <p className="text-gray-600">
              朝活を始めて、最初の成功体験を<br />
              積み重ねていきましょう！
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedTasks.map((task, index) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 rounded-full p-2 mt-1">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getTaskIcon(task.type)}</span>
                      <h3 className="text-lg font-bold text-gray-800">
                        {task.title}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {task.type === 'custom' ? 'カスタム' : '定型'}
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>予定: {formatDate(task.scheduledFor)}</span>
                      </div>
                      {task.completedAt && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>完了: {formatDate(task.completedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                      #{completedTasks.length - index}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 統計情報 */}
        {completedTasks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📊 統計情報</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{completedTasks.length}</div>
                <div className="text-sm text-gray-600">総完了数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">
                  {completedTasks.filter(t => t.type === 'custom').length}
                </div>
                <div className="text-sm text-gray-600">カスタムタスク</div>
              </div>
            </div>
          </div>
        )}

        {/* 励ましメッセージ */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mt-6 text-center border border-emerald-100">
          <div className="text-2xl mb-2">🌟</div>
          <p className="text-emerald-800 font-medium">
            継続は力なり。小さな積み重ねが<br />
            大きな変化を生み出します！
          </p>
        </div>
      </div>
    </div>
  )
}

export default CompletedTasksScreen