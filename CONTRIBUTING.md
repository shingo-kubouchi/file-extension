# コントリビューションガイド

ファイル拡張子チェッカーへのコントリビューションに興味を持っていただき、ありがとうございます！

## 🤝 コントリビューションの方法

### 1. Issue の報告
- バグを見つけた場合は、[バグレポート](https://github.com/your-username/file-extension/issues/new?template=bug_report.md)を使用してください
- 新機能を提案したい場合は、[機能要求](https://github.com/your-username/file-extension/issues/new?template=feature_request.md)を使用してください

### 2. Pull Request の作成

#### 事前準備
1. このリポジトリをフォークしてください
2. 新しいブランチを作成してください: `git checkout -b feature/your-feature-name`
3. 変更を行ってください
4. コミットしてください: `git commit -m 'Add some feature'`
5. ブランチにプッシュしてください: `git push origin feature/your-feature-name`
6. Pull Request を作成してください

#### 必須チェック
- [ ] `npm run lint` でESLintエラーがないこと
- [ ] `npm run type-check` でTypeScriptエラーがないこと
- [ ] `npm run build` でビルドが成功すること
- [ ] `npm run security-audit` でセキュリティ問題がないこと
- [ ] ブラウザでの動作確認が完了していること

## 🛡️ セキュリティ

このアプリケーションはセキュリティを重視しています。以下の点にご注意ください：

### セキュリティ原則
- **プライバシー保護**: ファイルはサーバーに送信されません
- **ファイルサイズ制限**: 大きなファイルは処理しません
- **入力検証**: 悪意のある入力を検証します
- **依存関係管理**: 脆弱性のあるパッケージは使用しません

### セキュリティ問題の報告
セキュリティに関する問題を発見した場合は、公開のIssueではなく、プライベートに報告してください。

## 🎯 開発ガイドライン

### コードスタイル
- TypeScriptを使用してください
- ESLintのルールに従ってください
- 関数やコンポーネントにはJSDocコメントを追加してください
- 日本語のコメントで説明を追加してください

### コミットメッセージ
```
type: 簡潔な説明

より詳しい説明（必要に応じて）

Closes #123
```

#### タイプ例
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント更新
- `style`: コードスタイルの変更
- `refactor`: リファクタリング
- `test`: テスト追加/修正
- `chore`: その他の変更

### テスト
- 新機能を追加する場合は、適切なテストケースを考慮してください
- ブラウザでの手動テストを実行してください
- 異なるファイル形式での動作確認を行ってください

## 🚀 開発環境のセットアップ

```bash
# リポジトリをクローン
git clone https://github.com/your-username/file-extension.git
cd file-extension

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ビルドテスト
npm run build

# リンターを実行
npm run lint

# 型チェックを実行
npm run type-check
```

## 📋 Pull Request のレビュープロセス

1. **自動チェック**: GitHub Actionsによる自動テストが実行されます
2. **コードレビュー**: メンテナーによるコードレビューが行われます
3. **動作確認**: 必要に応じて動作確認が行われます
4. **マージ**: 全てのチェックが完了後、mainブランチにマージされます

## 🙏 行動規範

- 敬意を持って接してください
- 建設的なフィードバックを心がけてください
- 多様性と包容性を尊重してください
- プロジェクトの目標に沿った貢献をしてください

## 📞 質問・サポート

質問がある場合は、[GitHub Discussions](https://github.com/your-username/file-extension/discussions) または [Issue](https://github.com/your-username/file-extension/issues) を通じてお気軽にお尋ねください。

ご協力いただき、ありがとうございます！🎉 