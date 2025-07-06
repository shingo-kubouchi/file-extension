'use client';

import { useState } from 'react';
import { FileAnalysisResult } from '../utils/fileDetector';

interface ResultTableProps {
  results: FileAnalysisResult[];
}

type FilterType = 'all' | 'match' | 'mismatch' | 'security';

export default function ResultTable({ results }: ResultTableProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  
  if (results.length === 0) return null;

  // フィルタリング機能
  const getFilteredResults = () => {
    switch (filter) {
      case 'match':
        return results.filter(result => result.isMatch);
      case 'mismatch':
        return results.filter(result => !result.isMatch);
      case 'security':
        return results.filter(result => !result.isSecure);
      default:
        return results;
    }
  };

  const filteredResults = getFilteredResults();

  // 全体の統計を計算
  const totalFiles = results.length;
  const matchedFiles = results.filter(result => result.isMatch).length;
  const mismatchedFiles = totalFiles - matchedFiles;
  const securityWarningFiles = results.filter(result => !result.isSecure).length;

  // フィルタリング後の統計を計算
  const filteredTotalFiles = filteredResults.length;
  const filteredMatchedFiles = filteredResults.filter(result => result.isMatch).length;
  const filteredMismatchedFiles = filteredTotalFiles - filteredMatchedFiles;

  // ファイルサイズを人間が読みやすい形式に変換
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 形式名を日本語に変換
  const formatTypeName = (type: string): string => {
    const typeMap: { [key: string]: string } = {
      'jpeg': 'JPEG',
      'png': 'PNG',
      'gif': 'GIF',
      'webp': 'WebP',
      'bmp': 'BMP',
      'tiff': 'TIFF',
      'ico': 'ICO',
      'svg': 'SVG',
      'unknown': '不明'
    };
    return typeMap[type] || type.toUpperCase();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 統計情報 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📊 分析結果の統計
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalFiles}</div>
            <div className="text-sm text-gray-600">総ファイル数</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{matchedFiles}</div>
            <div className="text-sm text-gray-600">一致ファイル数</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{mismatchedFiles}</div>
            <div className="text-sm text-gray-600">不一致ファイル数</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{securityWarningFiles}</div>
            <div className="text-sm text-gray-600">セキュリティ警告</div>
          </div>
        </div>
      </div>

      {/* フィルタリングボタン */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3 sm:mb-0">
            🔍 結果を絞り込み
          </h3>
          <div className="text-sm text-gray-600">
            表示中: {filteredTotalFiles}件 / 全{totalFiles}件
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            すべて表示 ({totalFiles})
          </button>
          <button
            onClick={() => setFilter('match')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'match'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✅ 一致のみ ({matchedFiles})
          </button>
          <button
            onClick={() => setFilter('mismatch')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'mismatch'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ❌ 不一致のみ ({mismatchedFiles})
          </button>
          <button
            onClick={() => setFilter('security')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'security'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ⚠️ セキュリティ警告 ({securityWarningFiles})
          </button>
        </div>
        
        {/* フィルタリング後の統計 */}
        {filter !== 'all' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">
              <span className="font-medium">絞り込み結果:</span> {filteredTotalFiles}件
              {(filter === 'match' || filter === 'mismatch') && (
                <span> (一致: {filteredMatchedFiles}件, 不一致: {filteredMismatchedFiles}件)</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 結果テーブル */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            📋 詳細な分析結果
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ファイル名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ファイル名拡張子
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  実際の形式
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  判定結果
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ファイルサイズ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">該当するファイルがありません</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {filter === 'match' && '一致するファイルがありません'}
                        {filter === 'mismatch' && '不一致のファイルがありません'}
                        {filter === 'security' && 'セキュリティ警告のあるファイルがありません'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredResults.map((result, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <span className="truncate max-w-xs" title={result.fileName}>
                          {result.fileName}
                        </span>
                        {!result.isSecure && (
                          <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                            警告
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {result.fileExtension || 'なし'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {formatTypeName(result.detectedType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        {result.isMatch ? (
                          <div className="flex items-center text-green-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">一致</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">不一致</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(result.fileSize)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* セキュリティ警告があるファイルの表示 */}
      {results.some(result => !result.isSecure) && filter !== 'security' && (
        <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                セキュリティ警告
              </h3>
              <div className="mt-2 text-sm text-orange-700">
                <p>一部のファイルでセキュリティ上の問題が検出されました：</p>
                <button
                  onClick={() => setFilter('security')}
                  className="mt-2 text-orange-600 hover:text-orange-800 underline text-sm"
                >
                  セキュリティ警告のあるファイルを表示 ({securityWarningFiles}件)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 不一致ファイルの警告 */}
      {mismatchedFiles > 0 && filter !== 'mismatch' && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                不一致ファイルが見つかりました！
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {mismatchedFiles}個のファイルで、ファイル名の拡張子と実際のファイル形式が一致しませんでした。
                </p>
                <button
                  onClick={() => setFilter('mismatch')}
                  className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
                >
                  不一致ファイルのみを表示 ({mismatchedFiles}件)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 