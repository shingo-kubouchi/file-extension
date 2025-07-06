'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ProgressBar from '@/components/ProgressBar';
import ResultTable from '@/components/ResultTable';
import { FileAnalysisResult, analyzeFiles } from '@/utils/fileDetector';
// import SecurityInfo from '@/components/SecurityInfo';

export default function Home() {
  const [results, setResults] = useState<FileAnalysisResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  // ファイル選択時の処理
  const handleFilesSelect = async (files: File[]) => {
    // 最大1000ファイルまでの制限
    const limitedFiles = files.slice(0, 1000);
    
    if (limitedFiles.length !== files.length) {
      alert(`ファイル数が1000を超えています。最初の1000ファイルのみ処理します。`);
    }

    setIsProcessing(true);
    setProgress({ current: 0, total: limitedFiles.length });
    setResults([]);

    try {
      const analysisResults = await analyzeFiles(limitedFiles, (completed, total) => {
        setProgress({ current: completed, total });
      });

      setResults(analysisResults);
    } catch (error) {
      console.error('ファイル分析エラー:', error);
      alert('ファイル分析中にエラーが発生しました。');
    } finally {
      setIsProcessing(false);
    }
  };

  // リセット機能
  const handleReset = () => {
    setResults([]);
    setProgress({ current: 0, total: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                🔍 ファイル拡張子チェッカー
              </h1>
            </div>
            {results.length > 0 && !isProcessing && (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                リセット
              </button>
            )}
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 説明セクション */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📝 このアプリについて
            </h2>
            <div className="text-gray-600 space-y-2">
              <p>
                このアプリは、画像ファイルの<strong>ファイル名の拡張子</strong>と<strong>実際のファイル形式</strong>を比較して、
                不一致を検出するツールです。
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>ファイルの先頭バイト（マジックバイト）を読み取って実際の形式を判定</li>
                <li>複数ファイルの一括処理が可能（最大1000ファイル）</li>
                <li>データはブラウザ内のみで処理され、外部には送信されません</li>
                <li>対応形式: JPEG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO</li>
              </ul>
            </div>
          </div>
        </div>

        {/* セキュリティ情報 */}
        {/* <SecurityInfo /> */}

        {/* ファイルアップローダー */}
        <div className="mb-8">
          <FileUploader 
            onFilesSelect={handleFilesSelect}
            isProcessing={isProcessing}
          />
        </div>

        {/* 進捗バー */}
        <ProgressBar 
          current={progress.current}
          total={progress.total}
          isVisible={isProcessing}
        />

        {/* 結果テーブル */}
        <ResultTable results={results} />

        {/* 使用方法 */}
        {results.length === 0 && !isProcessing && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                🚀 使用方法
              </h2>
              <div className="text-gray-600 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ファイルを選択</h3>
                    <p>上のアップロードエリアをクリックするか、ファイルをドラッグ&ドロップしてください。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">自動分析</h3>
                    <p>ファイルが選択されると自動的に分析が開始されます。進捗バーで進行状況を確認できます。</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">結果を確認</h3>
                    <p>分析結果がテーブルに表示されます。不一致ファイルは赤色で強調表示されます。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>
              🔒 プライバシー重視: すべての処理はブラウザ内で完結し、ファイルは外部に送信されません。
            </p>
            <p className="mt-2">
              💡 技術的な仕組み: ファイルの先頭バイト（マジックバイト）を読み取ることで、実際のファイル形式を判定しています。
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
