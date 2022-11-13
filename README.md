## Qiita (メタマスクに接続, アカウント切り替え, ネットワーク切り替え【Next.js】) サンプルコード

https://qiita.com/tokio_dev/items/4065eed0a5637aa1a58b

### 利用技術

- Next.js
- TypeScript
- ESLint
- Prettier
- Husky

## ディレクトリ構成

```
root/
┣━pages/ ページのルーティングとSEO設定など src以下の同じページ階層のコンポーネントを呼ぶ
┣━public/
┣━src/
  ┣━components/ 複数ページで利用するコンポーネント
  ┣━layouts/ 複数ページで利用するレイアウトコンポーネント
  ┣━libs/ ライブラリのラッパー関数等
  ┣━pages/ 特定のページごとに使うファイル
    ┣━〇〇
      ┣━〇〇〇.tsx 〇〇ページでのみ使うコンポーネント
      ┣━use〇〇〇.ts 〇〇ページでのみ使うhooks
      ┣━type.ts 〇〇ページでのみ使う型
    ┣
  ┣━types/ 複数ページで利用する型
  ┣━utils, hooks, styles, const, 複数ページで利用する〇〇

```
