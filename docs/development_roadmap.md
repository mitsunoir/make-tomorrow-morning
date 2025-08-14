# PWA朝活アプリ — 開発ロードマップ

## **PWA朝活アプリ — 技術スタック案**

### 1. フロントエンド（UI）

* **React + Vite**
  * 起動爆速、開発体験も軽い
  * 学習コストはあるけど情報量豊富
* **UIフレームワーク**
  * **shadcn/ui**でボタンやカードを即利用

---

### 2. PWA化（オフライン対応）

* **Service Worker**（Workbox推奨）
  * アプリシェル（HTML/JS/CSS）をキャッシュして即起動
  * タスク履歴や設定もIndexedDBに保存
* **manifest.json**
  * ホーム画面アイコン、起動画面色、フルスクリーン化設定
* **オフラインファースト戦略**
  * アプリ起動は必ずローカルキャッシュ
  * ネット接続は履歴同期や通知予約だけに使う

---

### 3. データ保存

* **IndexedDB（Dexie.js経由）**
  * タスク・履歴をブラウザ内に永続保存
  * 非同期APIだけどDexie使えば扱いやすい
* MVPならクラウド同期は後回し
  → 同期必要になったらFirebase FirestoreやSupabase追加

---

### 4. 通知機能

* **ローカル通知**（Service Worker経由）
  * PWAはPush API＋通知APIで朝リマインド可能（ただしiOSは制限あり）
* 初期は**メール通知 or LINE Bot連携**で代用しても可
  * Firebase Cloud Messaging（FCM）ならWeb Push簡単

---

### 5. 開発環境

* **Node.js + npm / pnpm**
  * React/Vite/Tailwind導入用
* **GitHub + GitHub Pages / Netlify / Vercel**
  * 無料でPWAホスティング
* **VS Code**
  * React＋Tailwind＋PWA開発の王道エディタ

---

### 6. 実装ロードマップ（勉強兼ねる前提）

1. **環境構築**（Vite＋React＋shadcn/ui）
2. **画面モック作成**（Figma不要、直接Reactで実装）
3. **ローカル保存（Dexie.js）でタスク管理**
4. **Service Worker設定（Workboxで簡略化）**
5. **manifest.json追加してPWA化**
6. **通知機能（Push API or 代替手段）**
7. **デプロイ＆スマホホーム画面から起動テスト**
8. **実運用テスト → 改善**

---

### 高速起動ポイント

* **初回起動後はService Workerキャッシュを利用**
* JSバンドル分割（Vite自動対応）
* UIレンダリングはシンプルに（初画面は1〜2コンポーネントのみ）
* 起動時にネットワーク待たずローカルDBからデータ即取得

---

💡 これなら、

* **朝5秒でタスク確認できる**
* **オフラインでも履歴更新できる**
* **週末にPC1台で開発学習も進む**

