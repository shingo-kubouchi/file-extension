# 🔍 ファイル拡張子チェッカー

[![CI](https://github.com/shingo-kubouchi/file-extension/actions/workflows/ci.yml/badge.svg)](https://github.com/shingo-kubouchi/file-extension/actions/workflows/ci.yml)
[![Security](https://img.shields.io/badge/security-verified-green.svg)](https://github.com/shingo-kubouchi/file-extension/security)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**ファイル名の拡張子と実際のファイル形式を比較して、不一致を検出するWebアプリケーション**

[📱 **Live Demo**](https://file-extension.netlify.app) | [📖 **ドキュメント**](docs/) | [🤝 **コントリビューション**](CONTRIBUTING.md)

## ✨ 特徴

- 🔎 **マジックバイト判定**: ファイルの先頭バイトを読み取って実際の形式を正確に判定
- 📊 **一括処理**: 最大1000ファイルまで同時に処理可能
- 🔒 **プライバシー重視**: すべての処理はブラウザ内で完結、サーバーへの送信なし
- 🛡️ **セキュリティ**: ファイルサイズ制限、入力検証、セキュリティヘッダー
- 🎯 **絞り込み機能**: 一致/不一致/セキュリティ警告でフィルタリング
- 📱 **レスポンシブ**: スマートフォンからデスクトップまで対応
- ⚡ **高性能**: バッチ処理とメモリ効率化で快適な動作

## 🎯 対応ファイル形式

| 形式 | 拡張子 | マジックバイト |
|------|--------|----------------|
| JPEG | `.jpg`, `.jpeg` | `FF D8 FF` |
| PNG | `.png` | `89 50 4E 47` |
| GIF | `.gif` | `47 49 46 38` |
| WebP | `.webp` | `52 49 46 46...57 45 42 50` |
| BMP | `.bmp` | `42 4D` |
| TIFF | `.tiff`, `.tif` | `49 49 2A 00` or `4D 4D 00 2A` |
| ICO | `.ico` | `00 00 01 00` |
| SVG | `.svg` | `<?xml` or `<svg` |

## 🚀 使用方法

### 1. オンラインで使用
[Live Demo](https://file-extension.netlify.app) にアクセスしてすぐに使用できます。

### 2. ローカルで実行
```bash
# リポジトリをクローン
git clone https://github.com/shingo-kubouchi/file-extension.git
cd file-extension

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# ブラウザで http://localhost:3000 を開く
```

### 3. 使用手順
1. **ファイル選択**: ドラッグ&ドロップまたはクリックでファイルを選択
2. **自動分析**: 選択されたファイルが自動的に分析開始
3. **結果確認**: 一致/不一致の結果を確認
4. **絞り込み**: 必要に応じて結果をフィルタリング

## 🛡️ セキュリティ

### プライバシー保護
- ✅ ファイルはサーバーに送信されません
- ✅ ファイルの先頭16バイトのみを読み取り
- ✅ ページリロードでデータが完全削除
- ✅ 外部サービスとの通信は一切なし

### セキュリティ機能
- ✅ ファイルサイズ制限: 50MB/ファイル
- ✅ 同時処理制限: 最大1000ファイル
- ✅ ファイル形式制限: 画像ファイルのみ
- ✅ 入力値検証: 不正なファイル名を検出
- ✅ セキュリティヘッダー: XSS、CSRF対策

## 🏗️ 技術スタック

- **フロントエンド**: Next.js 15, React 19, TypeScript
- **スタイリング**: Tailwind CSS
- **デプロイ**: Netlify
- **CI/CD**: GitHub Actions
- **品質管理**: ESLint, TypeScript, Security Audit

## 📊 アーキテクチャ

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   FileUploader  │───▶│   fileDetector  │───▶│   ResultTable   │
│                 │    │                 │    │                 │
│ ドラッグ&ドロップ │    │  マジックバイト │    │ 絞り込み機能    │
│ ファイル選択     │    │  セキュリティ   │    │ 統計表示        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ProgressBar   │    │ SecurityInfo    │    │  SecurityAlert  │
│                 │    │                 │    │                 │
│ 進捗表示        │    │ セキュリティ情報 │    │ 警告メッセージ  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### 始め方
1. このリポジトリをフォーク
2. 新しいブランチを作成: `git checkout -b feature/amazing-feature`
3. 変更をコミット: `git commit -m 'Add amazing feature'`
4. ブランチにプッシュ: `git push origin feature/amazing-feature`
5. Pull Requestを作成

詳細は[コントリビューションガイド](CONTRIBUTING.md)をご覧ください。

### 開発スクリプト
```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run lint         # ESLintチェック
npm run type-check   # TypeScript型チェック
npm run security-audit # セキュリティ監査
```

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🙏 謝辞

- [Next.js](https://nextjs.org/) 
- [Tailwind CSS](https://tailwindcss.com/) 
- [Netlify](https://netlify.com/) 

## 📞 サポート

質問やサポートが必要な場合は、以下をご利用ください：

- 📋 [Issues](https://github.com/shingo-kubouchi/file-extension/issues) - バグレポートや機能要求
- 💬 [Discussions](https://github.com/shingo-kubouchi/file-extension/discussions) - 質問や議論

---

⭐ このプロジェクトが役に立った場合は、スターをつけていただけると嬉しいです！
