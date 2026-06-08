const fs = require('fs');

const step3Data = JSON.parse(fs.readFileSync('src/data/lesson1Step3Exercises.json', 'utf8'));
const vocabList = step3Data.filter(item => item.type === 'sentence');

const allWords = vocabList.map(item => item.word);

function generateOptions(answer) {
  const options = new Set();
  options.add(answer);
  while (options.size < 4) {
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    options.add(randomWord);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

let step4Exercises = [];

// 1. 38 Story Context
vocabList.forEach(item => {
  step4Exercises.push({
    word: item.word,
    context: "Ngữ cảnh Bài khóa",
    sentence: item.story.sampleAnswer.replace(item.word, '_____'),
    translation: item.story.sampleTranslation,
    answer: item.word,
    options: generateOptions(item.word)
  });
});

// 2. 38 Business Context
vocabList.forEach(item => {
  step4Exercises.push({
    word: item.word,
    context: "Ngữ cảnh Doanh nghiệp",
    sentence: item.business.sampleAnswer.replace(item.word, '_____'),
    translation: item.business.sampleTranslation,
    answer: item.word,
    options: generateOptions(item.word)
  });
});

// 3. 24 Daily Life Context
const lifeSentences = [
  { word: "细节", sentence: "打扫房间时，不要忽略这些不起眼的_____。", translation: "Khi dọn phòng, đừng bỏ qua những chi tiết nhỏ nhặt này." },
  { word: "电台", sentence: "我爷爷每天早上都会听_____里的新闻节目。", translation: "Ông tôi mỗi sáng đều nghe bản tin trên đài phát thanh." },
  { word: "恩爱", sentence: "他们老两口结婚五十年了，依然非常_____。", translation: "Hai ông bà kết hôn 50 năm rồi, vẫn vô cùng ân ái." },
  { word: "对比", sentence: "把这两款手机_____一下，你会发现屏幕差距很大。", translation: "So sánh hai mẫu điện thoại này một chút, bạn sẽ thấy sự khác biệt lớn về màn hình." },
  { word: "入围", sentence: "他导演的电影成功_____了今年的最佳影片奖。", translation: "Bộ phim do anh ấy làm đạo diễn đã lọt vào danh sách đề cử Phim hay nhất năm nay." },
  { word: "评委", sentence: "这次歌唱比赛的_____非常严格，很多人都被淘汰了。", translation: "Giám khảo của cuộc thi hát lần này rất khắt khe, nhiều người đã bị loại." },
  { word: "如何", sentence: "遇到这种麻烦事，我们究竟该_____处理呢？", translation: "Gặp phải chuyện rắc rối thế này, rốt cuộc chúng ta nên xử lý thế nào?" },
  { word: "瘫痪", sentence: "昨天的暴雨导致整个城市的交通都_____了。", translation: "Trận mưa to hôm qua khiến giao thông toàn thành phố bị tê liệt." },
  { word: "离婚", sentence: "由于性格不合，他们结婚没多久就决定_____了。", translation: "Do tính cách không hợp, họ kết hôn chưa bao lâu đã quyết định ly hôn." },
  { word: "自杀", sentence: "遇到挫折不能轻生，_____绝对不是解决问题的办法。", translation: "Gặp trắc trở không được xem nhẹ mạng sống, tự sát tuyệt đối không phải là cách giải quyết." },
  { word: "抱怨", sentence: "我的室友每天都在_____食堂的饭菜不好吃。", translation: "Bạn cùng phòng của tôi ngày nào cũng phàn nàn đồ ăn ở căng tin không ngon." },
  { word: "爱护", sentence: "老师教育我们要从小_____小动物。", translation: "Giáo viên dạy chúng tôi từ nhỏ phải biết yêu thương động vật nhỏ." },
  { word: "婚姻", sentence: "幸福的_____需要两个人共同去经营和维护。", translation: "Một cuộc hôn nhân hạnh phúc cần hai người cùng vun đắp và duy trì." },
  { word: "吵架", sentence: "楼上的邻居昨天半夜又在_____，吵得我睡不着。", translation: "Hàng xóm tầng trên hôm qua nửa đêm lại cãi nhau, ồn đến mức tôi không ngủ được." },
  { word: "轮", sentence: "今天_____到我洗碗了，你去休息吧。", translation: "Hôm nay đến lượt tôi rửa bát rồi, bạn đi nghỉ đi." },
  { word: "不耐烦", sentence: "排队买票的人太多了，他等得有点_____了。", translation: "Người xếp hàng mua vé quá đông, anh ấy đợi đến mức có chút mất kiên nhẫn rồi." },
  { word: "靠", sentence: "那个年轻人_____在窗边，静静地看着外面的风景。", translation: "Chàng trai trẻ tựa vào bên cửa sổ, lặng lẽ ngắm nhìn phong cảnh bên ngoài." },
  { word: "肩膀", sentence: "他把沉重的背包背在_____上，继续向前走。", translation: "Anh ấy đeo chiếc ba lô nặng trĩu lên vai, tiếp tục đi về phía trước." },
  { word: "喊", sentence: "妈妈在楼下大声_____我下去吃饭。", translation: "Mẹ ở dưới lầu gọi lớn bảo tôi xuống ăn cơm." },
  { word: "伸", sentence: "早上醒来，他用力_____了一个懒腰。", translation: "Sáng sớm tỉnh dậy, anh ấy dùng sức vươn vai một cái." },
  { word: "递", sentence: "请把桌子上的那杯水_____给我，谢谢。", translation: "Xin hãy đưa cho tôi cốc nước trên bàn, cảm ơn." },
  { word: "居然", sentence: "天气预报说今天是晴天，下午_____下起了大雨！", translation: "Dự báo thời tiết nói hôm nay trời nắng, buổi chiều lại bất ngờ đổ mưa to!" },
  { word: "催", sentence: "快点穿鞋吧，别让大家一直_____你。", translation: "Mau mang giày vào đi, đừng để mọi người cứ giục bạn mãi." },
  { word: "等待", sentence: "我们在车站_____了将近一个小时，公交车才来。", translation: "Chúng tôi đã chờ ở trạm xe gần một tiếng đồng hồ, xe buýt mới đến." }
];

lifeSentences.forEach(item => {
  step4Exercises.push({
    word: item.word,
    context: "Ngữ cảnh Đời sống",
    sentence: item.sentence.replace(item.word, '_____'),
    translation: item.translation,
    answer: item.word,
    options: generateOptions(item.word)
  });
});

// Shuffle the 100 questions using Fisher-Yates
for (let i = step4Exercises.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [step4Exercises[i], step4Exercises[j]] = [step4Exercises[j], step4Exercises[i]];
}

// Add unique IDs
step4Exercises = step4Exercises.map((ex, index) => ({
  id: index + 1,
  ...ex
}));

fs.writeFileSync('src/data/lesson1Step4Exercises.json', JSON.stringify(step4Exercises, null, 2), 'utf8');
console.log(`Generated ${step4Exercises.length} Step 4 Exercises!`);
