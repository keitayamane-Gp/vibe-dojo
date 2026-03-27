# VIBE DOJO

バイブコーディングのお題ランダムジェネレーター。
「何を作るか」で詰まっているGoodpatch社員のために、
ターゲット × テーマ × 制約 の3要素をランダム組み合わせでアイデアを即座に提供する。

## 技術スタック

- Vite 8 + React 19 + TypeScript
- 外部API・バックエンドなし
- データ永続化: localStorage のみ
- 追加npmパッケージなし（純粋なCSS）

## ディレクトリ構成

```
src/
  App.tsx                        # ルートコンポーネント（状態管理の中心）
  App.css                        # VIBE DOJO固有スタイル
  index.css                      # グローバルスタイル・CSS変数
  main.tsx                       # エントリーポイント（変更不要）
  data/
    topics.ts                    # お題マスターデータ（ここを編集でデータ追加）
  types/
    index.ts                     # TypeScript型定義
  hooks/
    useLocalStorage.ts           # 汎用localStorageフック
    useVibeDojo.ts               # アプリ全体のビジネスロジック
  components/
    GeneratorCard.tsx            # メインカード（3要素表示+アクション）
    FavoritesList.tsx            # お気に入りリスト（折りたたみ式）
    ChallengeCounter.tsx         # チャレンジカウンター
```

## 開発コマンド

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド（型チェック含む）
npm run preview  # ビルド後のプレビュー
npm run lint     # ESLintチェック
```

## localStorage キー

| キー | 型 | 内容 |
|---|---|---|
| `vibe-dojo:favorites` | `FavoriteTopic[]` (JSON) | お気に入りのお題リスト |
| `vibe-dojo:challenge-count` | `number` (JSON) | 「このお題で作る！」累計回数 |

## お題データの追加方法

`src/data/topics.ts` の `targets` / `themes` / `constraints` 配列に文字列を追加するだけ。

## 設計上の決定事項

- **状態管理**: useVibeDojo カスタムフックに集約。Context API不使用（階層が浅いため不要）
- **CSS**: CSS変数 + BEMライクなクラス名。UIライブラリなし
- **アニメーション**: CSS `@keyframes` のみ（JSアニメーションなし）
- **お気に入り折りたたみ**: `<details>/<summary>` HTMLタグ（JS不要）
- **ダークモード**: `prefers-color-scheme: dark` で自動対応

## UX設計の前提

- ファーストビューで「何をするアプリか」が3秒でわかること
- シャッフルアニメーションで「次はどんなお題？」の期待感を演出
- お気に入りはデフォルト折りたたみ。メインのジェネレーターを常に主役に
- モバイルファースト（通勤中に使えること）
