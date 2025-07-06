'use client';

import { useState } from 'react';

export default function SecurityInfo() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              🔒 セキュリティ・プライバシー保護
            </h3>
            <p className="text-sm text-green-700">
              あなたのファイルは完全に安全です。すべての処理はブラウザ内で実行されます。
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green-600 hover:text-green-800 transition-colors"
        >
          <svg
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className="mt-4 text-sm text-green-700 space-y-3">
          <div>
            <h4 className="font-semibold">🛡️ セキュリティ機能</h4>
            <ul className="mt-2 list-disc list-inside space-y-1 ml-4">
              <li>ファイルサイズ制限: 1ファイル最大50MB</li>
              <li>同時処理制限: 最大1000ファイル</li>
              <li>対応形式の制限: 画像ファイルのみ</li>
              <li>ファイル名の検証: 不正な文字を検出</li>
              <li>マジックバイト検証: 実際のファイル内容を確認</li>
              <li>エラーハンドリング: 処理エラーを適切に処理</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold">🔐 プライバシー保護</h4>
            <ul className="mt-2 list-disc list-inside space-y-1 ml-4">
              <li>ファイルはサーバーに送信されません</li>
              <li>ファイルの先頭16バイトのみを読み取り</li>
              <li>ファイル内容は一切保存されません</li>
              <li>ページリロードでデータが完全に削除</li>
              <li>外部サービスとの通信は一切ありません</li>
              <li>ブラウザのローカルストレージも使用しません</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold">🌐 Webセキュリティ</h4>
            <ul className="mt-2 list-disc list-inside space-y-1 ml-4">
              <li>セキュリティヘッダーによる保護</li>
              <li>コンテンツセキュリティポリシー（CSP）</li>
              <li>クロスサイトスクリプティング（XSS）対策</li>
              <li>クリックジャッキング攻撃の防止</li>
              <li>HTTPS通信の強制</li>
              <li>フレーム埋め込みの禁止</li>
            </ul>
          </div>
          
          <div className="p-3 bg-green-100 rounded-lg">
            <p className="text-green-800 font-medium">
              💡 技術的な仕組み
            </p>
            <p className="text-green-700 mt-1">
              このアプリは、ファイルの「マジックバイト」（先頭の特殊なバイト列）を読み取ることで、
              ファイル名に依存しない正確な形式判定を行います。
              全ての処理はJavaScriptのFile APIを使用してブラウザ内で完結しています。
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 