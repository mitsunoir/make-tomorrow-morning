import { Sun, Clock, CheckCircle2 } from 'lucide-react'

const ReminderScreen = () => {
  const currentTask = '朝カフェで読書' // 実際にはpropsやstateから取得

  const handleComplete = () => {
    console.log('タスク完了:', currentTask)
    // 完了処理を実装
  }

  const handlePostpone = () => {
    console.log('タスク延期:', currentTask)
    // 延期処理を実装
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

          {/* タスク表示 */}
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
                  📌 {currentTask}
                </h2>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="space-y-4">
            <button
              onClick={handleComplete}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              やった！ 🎉
            </button>
            
            <button
              onClick={handlePostpone}
              className="w-full py-3 bg-gray-100 text-gray-700 font-medium text-lg rounded-2xl hover:bg-gray-200 transition-all duration-200"
            >
              延期する
            </button>
          </div>

          {/* 励ましメッセージ */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm leading-relaxed">
              小さな一歩でも、続けることで<br />
              大きな変化につながります ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReminderScreen