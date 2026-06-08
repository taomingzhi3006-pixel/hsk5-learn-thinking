const fs = require('fs');

const step3Data = JSON.parse(fs.readFileSync('src/data/lesson1Step3Exercises.json', 'utf8'));
const vocabList = step3Data.filter(item => item.type === 'sentence');
const allWords = vocabList.map(item => item.word);

function generateOptions(answer, count = 4) {
  const options = new Set();
  options.add(answer);
  while (options.size < count) {
    options.add(allWords[Math.floor(Math.random() * allWords.length)]);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

let step6Exercises = [];

// Type 1: Đọc hiểu điền từ (20 questions)
for (let i = 0; i < 20; i++) {
  const item = vocabList[i];
  const options = generateOptions(item.word);
  const optionsWithPrefix = options.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}. ${opt}`);
  const answerIdx = options.indexOf(item.word);
  
  step6Exercises.push({
    id: `t1_${i+1}`,
    type: 'Đọc hiểu điền từ',
    text: item.story.sampleAnswer.replace(item.word, '________'),
    options: optionsWithPrefix,
    answer: optionsWithPrefix[answerIdx]
  });
}

// Type 2: Chọn từ đúng ngữ cảnh (20 questions)
const type2List = [...vocabList.slice(20, 38), vocabList[0], vocabList[1]];
for (let i = 0; i < 20; i++) {
  const item = type2List[i];
  const options = generateOptions(item.word);
  const optionsWithPrefix = options.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}. ${opt}`);
  const answerIdx = options.indexOf(item.word);
  
  step6Exercises.push({
    id: `t2_${i+1}`,
    type: 'Chọn từ đúng ngữ cảnh',
    text: item.story.sampleAnswer.replace(item.word, '________'),
    options: optionsWithPrefix,
    answer: optionsWithPrefix[answerIdx]
  });
}

// Type 3: Sắp xếp câu (20 questions)
const chunkData = [
  { chunks: ["电台", "寻找", "举办了一次", "最恩爱夫妻的活动"], order: [1, 3, 2, 4] },
  { chunks: ["有三对夫妻", "对比后，", "成功", "入围"], order: [2, 1, 3, 4] },
  { chunks: ["说说", "评委叫第一对夫妻", "恩爱的", "他们是如何"], order: [2, 1, 4, 3] },
  { chunks: ["结婚十几年", "第一对夫妻说", "吵过架", "从来没"], order: [2, 1, 4, 3] },
  { chunks: ["妻子", "第二对夫妻中，", "瘫痪了", "生病"], order: [2, 1, 4, 3] },
  { chunks: ["从来没有", "丈夫", "抱怨过", "一直照顾她，"], order: [2, 4, 1, 3] },
  { chunks: ["听了", "评委们", "他们的故事，", "暗暗点头"], order: [1, 3, 2, 4] },
  { chunks: ["轮到", "终于", "上场了", "第三对夫妻"], order: [2, 1, 4, 3] },
  { chunks: ["观众", "听到声音，", "开始有些不耐烦了", "等了很久没"], order: [4, 2, 1, 3] },
  { chunks: ["男人的头", "女人", "靠在", "的肩膀上睡着了"], order: [1, 3, 2, 4] },
  { chunks: ["为了", "睡觉", "不影响丈夫", "她居然放弃了比赛"], order: [1, 3, 2, 4] },
  { chunks: ["大家", "安静", "放在嘴边，示意", "女人伸出一根手指"], order: [4, 3, 1, 2] },
  { chunks: ["用手指了指", "女人", "纸条", "写好的"], order: [2, 1, 4, 3] },
  { chunks: ["歪歪扭扭的字", "用左手", "女人", "写下了"], order: [3, 2, 4, 1] },
  { chunks: ["轻轻地", "把纸条", "女人", "递给了评委"], order: [3, 2, 1, 4] },
  { chunks: ["充满了", "大家", "疑问", "的脑袋里都"], order: [2, 4, 1, 3] },
  { chunks: ["为什么放弃", "评委问", "这次机会", "这位女士"], order: [2, 4, 1, 3] },
  { chunks: ["半夜", "家里飞来了", "昨天", "很多蚊子"], order: [3, 1, 2, 4] },
  { chunks: ["为了不让", "丈夫", "打了一夜的蚊子", "老婆被蚊子咬，"], order: [2, 1, 4, 3] },
  { chunks: ["体现在", "真正的爱", "生活细节中", "往往"], order: [2, 4, 1, 3] }
];

const circleNumbers = ["①", "②", "③", "④"];

chunkData.forEach((item, index) => {
  const text = item.chunks.map((c, i) => `${circleNumbers[i]}${c}`).join('  ');
  const correctOrderStr = item.order.map(n => circleNumbers[n - 1]).join('');
  
  // Generate 3 wrong orders
  const options = new Set();
  options.add(correctOrderStr);
  while(options.size < 4) {
    const randomOrder = [...item.order].sort(() => Math.random() - 0.5);
    options.add(randomOrder.map(n => circleNumbers[n - 1]).join(''));
  }
  
  const finalOptions = Array.from(options).sort(() => Math.random() - 0.5);
  const optionsWithPrefix = finalOptions.map((opt, idx) => `${['A', 'B', 'C', 'D'][idx]}. ${opt}`);
  const answerIdx = finalOptions.indexOf(correctOrderStr);

  step6Exercises.push({
    id: `t3_${index+1}`,
    type: 'Sắp xếp câu (Mô phỏng viết HSK5)',
    text: text,
    options: optionsWithPrefix,
    answer: optionsWithPrefix[answerIdx]
  });
});

fs.writeFileSync('src/data/lesson1Step6Exercises.json', JSON.stringify(step6Exercises, null, 2), 'utf8');
console.log(`Generated ${step6Exercises.length} Step 6 Exercises!`);
