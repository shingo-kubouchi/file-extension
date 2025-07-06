'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  isVisible: boolean;
}

export default function ProgressBar({ current, total, isVisible }: ProgressBarProps) {
  if (!isVisible) return null;

  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium text-gray-700">
            ファイル処理中...
          </h3>
          <span className="text-sm text-gray-500">
            {current} / {total} ファイル
          </span>
        </div>
        
        {/* プログレスバー */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* パーセンテージ表示 */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>進捗: {percentage}%</span>
          <span>
            {current === total ? '完了' : '処理中'}
          </span>
        </div>
        
        {/* 処理時間の目安 */}
        {current > 0 && current < total && (
          <div className="mt-2 text-xs text-gray-500">
            💡 大量のファイルを処理中です。しばらくお待ちください...
          </div>
        )}
      </div>
    </div>
  );
} 