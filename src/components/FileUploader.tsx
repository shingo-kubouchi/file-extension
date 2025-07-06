'use client';

import { useCallback, useState } from 'react';

interface FileUploaderProps {
  onFilesSelect: (files: File[]) => void;
  isProcessing: boolean;
}

export default function FileUploader({ onFilesSelect, isProcessing }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  // ドラッグ&ドロップのイベントハンドラー
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    // 画像ファイルのみをフィルタリング
    const imageFiles = files.filter(file => file.type.startsWith('image/') || 
      file.name.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/));
    
    if (imageFiles.length > 0) {
      onFilesSelect(imageFiles);
    }
  }, [onFilesSelect]);

  // ファイル選択のイベントハンドラー
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesSelect(files);
    }
  }, [onFilesSelect]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isProcessing && document.getElementById('fileInput')?.click()}
      >
        <div className="space-y-4">
          {/* アイコン */}
          <div className="mx-auto w-16 h-16 text-gray-400">
            <svg
              className="w-full h-full"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          
          {/* メッセージ */}
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isProcessing ? '処理中...' : '画像ファイルを選択またはドラッグ&ドロップ'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              対応形式: JPG, PNG, GIF, BMP, WebP, SVG, TIFF, ICO
            </p>
            <p className="text-sm text-gray-500">
              最大1000ファイルまで同時に処理可能
            </p>
          </div>
          
          {/* ファイル選択ボタン */}
          <div>
            <button
              type="button"
              disabled={isProcessing}
              className={`
                px-6 py-3 rounded-lg font-medium transition-colors
                ${isProcessing
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
                             onClick={(e) => {
                 e.stopPropagation();
                 if (!isProcessing) {
                   document.getElementById('fileInput')?.click();
                 }
               }}
            >
              {isProcessing ? '処理中...' : 'ファイルを選択'}
            </button>
          </div>
        </div>
        
        {/* 隠しファイル入力 */}
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*,.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.tiff,.ico"
          className="hidden"
          onChange={handleFileSelect}
          disabled={isProcessing}
        />
      </div>
      
      {/* 注意事項 */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              このアプリについて
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                • ファイル名の拡張子と実際のファイル形式を比較して、不一致を検出します<br />
                • ファイルの先頭バイト（マジックバイト）を読み取って実際の形式を判定します<br />
                • データはブラウザ内のみで処理され、サーバーには送信されません<br />
                • ページをリロードするとデータは削除されます
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 