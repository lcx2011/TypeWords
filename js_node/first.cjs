const fs = require('fs');
const path = require('path');

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 转换单词列表为项目需要的格式
function convertWordsToDict(inputFile, outputFileName) {
  console.log('开始转换单词列表...');
  
  // 读取单词列表
  const text = fs.readFileSync(inputFile, 'utf-8');
  const words = text.split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0 && !word.startsWith('#')) // 过滤空行和注释
    .map(word => ({
      word: word,
    }));
  
  console.log(`找到 ${words.length} 个单词`);
  
  // 确保目录存在
  ensureDir('js_node/source');
  
  // 保存到 source 目录
  const outputPath = path.join('js_node/source', outputFileName);
  fs.writeFileSync(outputPath, JSON.stringify(words, null, 2), 'utf-8');
  
  console.log(`✅ 转换完成！文件已保存到: ${outputPath}`);
  console.log('下一步：运行转换和爬虫脚本来丰富单词信息');
  
  return words.length;
}

// 如果直接运行此脚本
if (require.main === module) {
  try {
    convertWordsToDict('1.txt', 'my_custom_words.json');
  } catch (error) {
    console.error('转换失败:', error.message);
  }
}

module.exports = { convertWordsToDict };