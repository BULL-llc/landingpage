**Source Visual Truth**

- Source visual: `docs/specs/bootcamp-lp-reference-executive-transformation.png`
- Scoped requested edits: 申し込み部分を 1 問 1 答形式の独立フローへ変更。人数は通常枠 6 名まで、7 名以上は応相談。Scale Inside / 社内トレーナー育成 / キャッシュバック / 社内展開サポートの訴求は削除。
- Implementation screenshot: `/tmp/bootcamp-lp-desktop-flow.png`
- Mobile screenshot: `/tmp/bootcamp-lp-mobile-flow.png`
- Viewport: desktop 1440 x 1024、mobile 390 x 844。
- State: 初期表示、FAQ 閉、申し込みフロー 1 問目。
- Full-view comparison evidence: `/tmp/bootcamp-lp-desktop-flow.png` を参照。
- Focused region comparison evidence: 申し込みフローはユーザー指定で参照デザインから意図的に変更したため、末尾セクションを個別確認した。送信完了までブラウザ操作済み。

**Findings**

- なし。P0 / P1 / P2 の修正対象はありません。

**Required Fidelity Surfaces**

- Fonts and typography: 参照案に近い明朝見出しと日本語ゴシック本文で階層を維持。モバイル見出しの折り返しも破綻なし。
- Spacing and layout rhythm: ヒーロー、白地セクション、薄い紙色セクションのリズムを維持。申し込み部分は独立した入力体験として余白を広めに再設計。
- Colors and visual tokens: 深緑、金、白、紙色の構成を維持。人数制限の表現も価格パネルと FAQ に反映。
- Image quality and asset fidelity: ヒーローと申し込み導入部はローカルの生成画像を使用。プレースホルダーや CSS 代替画像はなし。
- Copy and content: 料金は「2日間 / 1名 200,000円（税別）」、人数は「通常枠は6名まで。7名以上は応相談。」に統一。Scale Inside 関連コピーは削除済み。

**Patches Made Since Previous QA Pass**

- 申し込みフォームを 1 問 1 答の独立フローに変更。
- 参加予定人数の選択肢を 1〜6 名と 7 名以上（応相談）へ変更。
- 価格パネルと FAQ に人数上限を反映。
- Scale Inside、社内トレーナー育成、キャッシュバック、社内展開サポートのセクションを削除。

**Implementation Checklist**

- [x] デスクトップ表示を確認。
- [x] モバイル表示を確認。
- [x] FAQ 開閉を確認。
- [x] 申し込みフローの 1 問 1 答進行を確認。
- [x] 7 名以上（応相談）の選択を確認。
- [x] 同意チェック後の送信完了を確認。

**Follow-up Polish**

- なし。

final result: passed
