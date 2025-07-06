import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静的サイト生成の設定
  output: 'export',
  
  // 画像最適化を無効化（静的サイトでは使用不可）
  images: {
    unoptimized: true,
  },
  
  // ベースパスの設定（サブディレクトリでデプロイする場合）
  // basePath: '/your-app-name',
  
  // アセットのプレフィックス
  // assetPrefix: '/your-app-name/',
  
  // 末尾のスラッシュを追加
  trailingSlash: true,
  
  // 開発時のESLint設定
  eslint: {
    // 本番ビルド時にESLintエラーを無視（警告のみ）
    ignoreDuringBuilds: false,
  },
  
  // TypeScriptの設定
  typescript: {
    // 本番ビルド時にTypeScriptエラーを無視しない
    ignoreBuildErrors: false,
  },
  
  // セキュリティヘッダーの設定は netlify.toml で行う
  // static export では async headers は使用できない
};

export default nextConfig;
