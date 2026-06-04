# GitHub Pages ホスティング仕様書

## 概要

生成 AI プロダクト開発ブートキャンプ LP を GitHub Pages で公開する。
GitHub Actions で `packages/frontend` をビルドし、`packages/frontend/dist` を Pages artifact としてデプロイする。

## 受け入れ基準

- [ ] `main` への push で GitHub Pages のデプロイ workflow が実行される。
- [ ] 公開 URL は `https://bull-llc.github.io/landingpage/` とする。
- [ ] GitHub Pages のサブパス配信でも CSS、JavaScript、画像が読み込まれる。
- [ ] 既存の `make before-commit` が通る。

## 技術設計

- `.github/workflows/pages.yml` を追加する。
- GitHub Actions の action は既存 CI と同じく full SHA に固定する。
- `packages/frontend/index.html` の静的アセット参照は相対パスにする。

## スコープ外

- 独自ドメイン設定。
- 本番申し込み API 連携。
