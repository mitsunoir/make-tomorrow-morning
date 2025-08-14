import Dexie from "dexie";

export interface Task {
  id?: number;
  title: string;
  type: "predefined" | "custom";
  isCompleted: number; // 0 = false, 1 = true (indexable)
  createdAt: Date;
  scheduledFor: Date;
  completedAt?: Date;
}

export class MorningTaskDB extends Dexie {
  tasks!: Dexie.Table<Task, number>;

  constructor() {
    super("MorningTaskDB");
    this.version(2).stores({
      tasks:
        "++id, title, type, isCompleted, createdAt, scheduledFor, completedAt",
    });
    
    // マイグレーション: v1からv2へ
    this.version(2).upgrade(trans => {
      return trans.table('tasks').toCollection().modify(task => {
        // boolean を number に変換
        if (typeof task.isCompleted === 'boolean') {
          task.isCompleted = task.isCompleted ? 1 : 0;
        }
      });
    });
  }
}

export const db = new MorningTaskDB();

// データベース操作のヘルパー関数
export const taskService = {
  // 明日の朝のタスクを保存
  async saveTomorrowTasks(
    tasks: Omit<Task, "id" | "createdAt" | "scheduledFor">[],
  ) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(7, 0, 0, 0); // 朝7時に設定

    const tasksToSave = tasks.map((task) => ({
      ...task,
      isCompleted: task.isCompleted ? 1 : 0, // boolean を number に変換
      createdAt: new Date(),
      scheduledFor: tomorrow,
    }));

    // デバッグ用：削除処理を無効化（複数のタスクが蓄積される）
    // await db.tasks.where("scheduledFor").equals(tomorrow).delete();
    return await db.tasks.bulkAdd(tasksToSave);
  },

  // 今日のタスクを取得（デモ用に直近の未完了タスクを取得）
  async getTodayTasks(): Promise<Task[]> {
    try {
      // 未完了タスク（isCompleted = 0）を取得
      const tasks = await db.tasks
        .where('isCompleted')
        .equals(0)
        .reverse()
        .sortBy('createdAt');

      console.log("取得されたタスク:", tasks);
      return tasks;
    } catch (error) {
      console.error("getTodayTasks エラー:", error);
      return [];
    }
  },

  // タスク完了をマーク
  async completeTask(taskId: number) {
    return await db.tasks.update(taskId, {
      isCompleted: 1, // number型で完了をマーク
      completedAt: new Date(),
    });
  },

  // タスクを延期（明日に移動）
  async postponeTask(taskId: number) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(7, 0, 0, 0);

    return await db.tasks.update(taskId, {
      scheduledFor: tomorrow,
    });
  },

  // 完了済みタスクを取得
  async getCompletedTasks(): Promise<Task[]> {
    try {
      const tasks = await db.tasks
        .where('isCompleted')
        .equals(1)
        .reverse()
        .sortBy('completedAt');

      console.log("完了済みタスク:", tasks);
      return tasks;
    } catch (error) {
      console.error("getCompletedTasks エラー:", error);
      return [];
    }
  },

  // 全タスク履歴を取得
  async getAllTasks(): Promise<Task[]> {
    return await db.tasks.orderBy("createdAt").reverse().toArray();
  },
};

