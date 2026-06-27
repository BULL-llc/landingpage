### 生成 AI プロダクト開発ブートキャンプ LP - 2026-06-04

#### 目的

生成 AI とクラウドを使った 2 日間集中型プロダクト開発ブートキャンプのランディングページを作成し、参加申し込みまで進める動線を提供する。

#### 制約

- Product Design で選択された 1 番のビジュアル案を実装ターゲットにする。
- 料金は 2 日間 / 1 名 200,000 円（税別）とする。
- 主 CTA は参加申し込みにする。
- 申し込みは問い合わせ欄ではなく、必要情報を 1 問 1 答で入力する独立フローにする。
- 人数は通常枠を 6 名までとし、7 名以上は応相談とする。
- 社内トレーナー育成、キャッシュバック、社内展開サポートの訴求は削除する。
- 既存リポジトリは空のテンプレート状態のため、依存追加なしの静的フロントエンドとして最小構成で実装する。
- フォーム送信はローカルの完了表示のみで、個人情報は永続化しない。

#### タスク

- [x] 仕様書を作成する。
- [x] 参照デザインと同じ方向の画像アセットを用意する。
- [x] `packages/frontend` に静的 LP を実装する。
- [x] CTA スクロール、FAQ 開閉、1 問 1 答の申し込みフロー送信を実装する。
- [x] ローカルで表示確認し、デスクトップとモバイルのレイアウトを調整する。
- [x] `design-qa.md` を作成し、Product Design の比較結果を記録する。
- [x] 品質ゲートを実行する。

#### 検証手順

- `bun run --filter frontend test`
- `bun run --filter frontend build`
- `bun run --filter frontend dev`
- ブラウザでヒーロー、FAQ、申し込みフロー、レスポンシブ表示を確認する。
- `bun scripts/architecture-harness.ts --staged --fail-on=error`
- `make before-commit`

#### 進捗ログ

- 2026-06-04: Product Design のブリーフを確定し、Executive Transformation 案を実装ターゲットにした。
- 2026-06-04: 申し込み部分を 1 問 1 答の独立フローへ変更し、人数を 6 名まで、7 名以上は応相談にした。

#### 振り返り

- 空テンプレートから依存追加なしの静的 LP として実装したため、開発サーバー、テスト、ビルドは Bun だけで完結した。
- 申し込みは問い合わせフォームではなく、開催準備に必要な情報を 1 問ずつ集める体験にした。

### GitHub Pages ホスティング - 2026-06-05

#### 目的

生成 AI プロダクト開発ブートキャンプ LP を GitHub Pages で公開する。

#### 制約

- 公開 URL は `https://bull-llc.github.io/landingpage/` とする。
- GitHub Pages の project site 配信に対応するため、静的アセットは相対パスで参照する。
- GitHub Actions の action は full SHA に固定する。
- 既存 CI と同じく lifecycle scripts を無効化して依存をインストールする。

#### タスク

- [x] GitHub Pages の仕様書を作成する。
- [x] Pages deploy workflow を追加する。
- [x] HTML の静的アセット参照を相対パスにする。
- [x] ローカルの build / test / lint を確認する。
- [x] PR 作成、CI 確認、マージを行う。
- [x] Pages の公開 URL を確認する。

#### 検証手順

- `bun run test`
- `bun run build`
- `bun run lint`
- `bun run typecheck`
- `bun scripts/architecture-harness.ts --staged --fail-on=error`
- `make before-commit`
- GitHub Actions の `pages` workflow が成功すること。
- `https://bull-llc.github.io/landingpage/` で CSS、JavaScript、画像が読み込まれること。

#### 進捗ログ

- 2026-06-05: GitHub Pages が workflow mode で有効なことを確認した。
- 2026-06-05: Pages workflow を追加し、GitHub Pages の project site 配信用に静的アセット参照を相対パスへ変更した。

#### 振り返り

- GitHub Pages は `/landingpage/` 配下で公開されるため、絶対パスのアセット参照を避ける必要があった。

### Cloudflare Pages への移行 - 2026-06-26

#### 目的

会社サイト（生成 AI ブートキャンプ LP）のホスティングを GitHub Pages から Cloudflare Pages へ一本化する。

#### 制約

- 静的サイトのまま配信する（backend は使わない）。
- デプロイは Cloudflare Pages の Git 連携に任せ、GitHub Actions のデプロイ workflow は持たない（TenkaCloud と同方式）。
- アセット参照は相対パスのままとし、Cloudflare Pages のルート配信でもそのまま動作させる。

#### タスク

- [x] リポジトリ直下に `wrangler.toml`（`name` + `pages_build_output_dir`）を追加する。
- [x] GitHub Pages workflow（`pages.yml`）を削除する。
- [x] README の公開 URL を Cloudflare Pages（`https://bull-landingpage.pages.dev/`）へ更新する。
- [ ] Cloudflare ダッシュボードで Pages プロジェクトを GitHub リポジトリに接続し、ビルドコマンド `bun run --filter frontend build` を設定する（リポジトリ管理者作業）。
- [ ] カスタムドメイン `www.bullxyz.com` を Pages プロジェクトに割り当てる（リポジトリ管理者作業）。

#### 検証手順

- `main` への push で Cloudflare Pages の自動ビルド・デプロイが成功すること。
- `https://www.bullxyz.com/` で CSS、JavaScript、画像が読み込まれること。

#### 進捗ログ

- 2026-06-26: 静的アセット参照がすべて相対パスのため、Cloudflare Pages のルート配信でも変更不要と確認した。
- 2026-06-26: TenkaCloud の方式（Git 連携 + wrangler.toml、GitHub Actions デプロイ workflow なし）に合わせ、`wrangler.toml` を追加し GitHub Pages workflow を削除した。

#### 振り返り

- GitHub Pages はサブパス配信だったが、Cloudflare Pages はルート配信のため相対パス資産がそのまま流用でき、移行コストを抑えられた。
- デプロイを Cloudflare の Git 連携に寄せることで、GitHub Actions に Cloudflare 認証情報（API トークン・Account ID）を持たせずに済み、CI から秘密情報を排除できた。
