// ファイルの拡張子判定に関するユーティリティ関数

/**
 * ファイルの結果を表す型
 */
export interface FileAnalysisResult {
  fileName: string;           // ファイル名
  fileExtension: string;      // ファイル名から取得した拡張子
  detectedType: string;       // 実際に検出されたファイル形式
  isMatch: boolean;           // 拡張子と実際の形式が一致するかどうか
  fileSize: number;           // ファイルサイズ（バイト）
}

/**
 * ファイルの先頭バイトを読み取って実際のファイル形式を判定する
 * @param file - 判定対象のファイル
 * @returns 検出されたファイル形式
 */
export async function detectFileType(file: File): Promise<string> {
  // ファイルの先頭16バイトを読み取る（大抵のマジックバイトは16バイト以内）
  const buffer = await file.slice(0, 16).arrayBuffer();
  const bytes = new Uint8Array(buffer);
  
  // 各ファイル形式のマジックバイトをチェック
  
  // JPEG形式: FF D8 FF で始まる
  if (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) {
    return 'jpeg';
  }
  
  // PNG形式: 89 50 4E 47 0D 0A 1A 0A で始まる
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 &&
      bytes[4] === 0x0D && bytes[5] === 0x0A && bytes[6] === 0x1A && bytes[7] === 0x0A) {
    return 'png';
  }
  
  // GIF形式: GIF87a または GIF89a で始まる
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38 &&
      (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61) {
    return 'gif';
  }
  
  // WebP形式: RIFF....WEBP で始まる
  if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
      bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return 'webp';
  }
  
  // BMP形式: BM で始まる
  if (bytes[0] === 0x42 && bytes[1] === 0x4D) {
    return 'bmp';
  }
  
  // TIFF形式: II*\0 または MM\0* で始まる
  if ((bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2A && bytes[3] === 0x00) ||
      (bytes[0] === 0x4D && bytes[1] === 0x4D && bytes[2] === 0x00 && bytes[3] === 0x2A)) {
    return 'tiff';
  }
  
  // ICO形式: \0\0\1\0 で始まる
  if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) {
    return 'ico';
  }
  
  // SVG形式: XML宣言または<svg で始まる（テキストファイルなので文字として読み取る）
  const textDecoder = new TextDecoder('utf-8');
  const text = textDecoder.decode(bytes);
  if (text.includes('<?xml') || text.includes('<svg')) {
    return 'svg';
  }
  
  // 判定できない場合
  return 'unknown';
}

/**
 * ファイル名から拡張子を取得する
 * @param fileName - ファイル名
 * @returns 拡張子（小文字、ドットなし）
 */
export function getFileExtension(fileName: string): string {
  const lastDot = fileName.lastIndexOf('.');
  if (lastDot === -1) return '';
  return fileName.substring(lastDot + 1).toLowerCase();
}

/**
 * ファイルを分析して結果を返す
 * @param file - 分析対象のファイル
 * @returns 分析結果
 */
export async function analyzeFile(file: File): Promise<FileAnalysisResult> {
  const fileExtension = getFileExtension(file.name);
  const detectedType = await detectFileType(file);
  
  // 拡張子と検出された形式の一致を判定
  // jpeg と jpg は同じ形式として扱う
  const normalizedExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
  const isMatch = normalizedExtension === detectedType;
  
  return {
    fileName: file.name,
    fileExtension,
    detectedType,
    isMatch,
    fileSize: file.size
  };
}

/**
 * 複数のファイルを分析する（バッチ処理）
 * @param files - 分析対象のファイルリスト
 * @param onProgress - 進捗コールバック関数
 * @returns 分析結果の配列
 */
export async function analyzeFiles(
  files: File[],
  onProgress?: (completed: number, total: number) => void
): Promise<FileAnalysisResult[]> {
  const results: FileAnalysisResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const result = await analyzeFile(files[i]);
    results.push(result);
    
    // 進捗を通知
    if (onProgress) {
      onProgress(i + 1, files.length);
    }
  }
  
  return results;
} 