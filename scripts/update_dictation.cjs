const fs = require('fs');

const path = 'src/data/lesson1Step3Exercises.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Filter out old dictation
const otherData = data.filter(item => item.type !== 'dictation');

const newDictations = [
  { id: "d1", type: "dictation", text: "电台要选出一对最恩爱的夫妻。", translation: "Đài phát thanh muốn chọn ra một cặp vợ chồng ân ái nhất." },
  { id: "d2", type: "dictation", text: "对比后有三对夫妻入围。", translation: "Sau khi so sánh có ba cặp vợ chồng lọt vào vòng trong." },
  { id: "d3", type: "dictation", text: "评委叫第一对夫妻说说他俩是如何恩爱的。", translation: "Giám khảo bảo cặp vợ chồng thứ nhất nói xem hai người họ ân ái như thế nào." },
  { id: "d4", type: "dictation", text: "第一对夫妻说，几年了，他们从来没吵过架，相敬如宾。", translation: "Cặp vợ chồng thứ nhất nói, đã mấy năm nay, họ chưa từng cãi nhau, luôn tương kính như tân." },
  { id: "d5", type: "dictation", text: "评委听了暗暗点头。", translation: "Các giám khảo nghe xong thầm gật đầu." },
  { id: "d6", type: "dictation", text: "轮到第二对夫妻了。", translation: "Đến lượt cặp vợ chồng thứ hai." },
  { id: "d7", type: "dictation", text: "妻子生病瘫痪了，丈夫一直陪伴在她的身边，照顾她，从来没有抱怨过。", translation: "Người vợ lâm bệnh và bị liệt, người chồng luôn đồng hành bên cạnh, chăm sóc cô ấy, chưa từng phàn nàn." },
  { id: "d8", type: "dictation", text: "评委们听了很感动。", translation: "Các giám khảo nghe xong rất cảm động." },
  { id: "d9", type: "dictation", text: "终于轮到第三对夫妻上场了。", translation: "Cuối cùng cũng đến lượt cặp vợ chồng thứ ba lên sân khấu." },
  { id: "d10", type: "dictation", text: "但是等了很久没听到声音。", translation: "Nhưng đợi rất lâu không nghe thấy âm thanh gì." },
  { id: "d11", type: "dictation", text: "观众开始有些不耐烦了。", translation: "Khán giả bắt đầu có chút sốt ruột." },
  { id: "d12", type: "dictation", text: "原来，男人的头靠在女人的肩膀上睡着了。", translation: "Thì ra, đầu của người đàn ông đã tựa vào vai người phụ nữ và ngủ thiếp đi." },
  { id: "d13", type: "dictation", text: "评委正想大声喊醒那个男人，女人伸出一根手指放在嘴边，示意大家安静。", translation: "Giám khảo đang định gọi lớn đánh thức người đàn ông đó, người phụ nữ bèn đưa một ngón tay lên miệng, ra hiệu mọi người im lặng." },
  { id: "d14", type: "dictation", text: "女人用左手写下了歪歪扭扭的字，把纸条轻轻地递给了评委。", translation: "Người phụ nữ dùng tay trái viết ra những chữ xiêu vẹo, rồi nhẹ nhàng đưa tờ giấy cho giám khảo." },
  { id: "d15", type: "dictation", text: "评委看了一下，上面写着：", translation: "Giám khảo nhìn qua, bên trên viết:" },
  { id: "d16", type: "dictation", text: "“为了不影响丈夫睡觉，我放弃这次机会。”", translation: "\"Để không ảnh hưởng đến giấc ngủ của chồng, tôi từ bỏ cơ hội lần này.\"" },
  { id: "d17", type: "dictation", text: "大家的脑袋里都充满了疑问。", translation: "Trong đầu mọi người đều đầy ắp những câu hỏi." },
  { id: "d18", type: "dictation", text: "评委问这位女士为什么放弃这次机会。", translation: "Giám khảo hỏi quý cô này tại sao lại từ bỏ cơ hội lần này." },
  { id: "d19", type: "dictation", text: "女士叙述了原因：昨天半夜家里飞来了很多蚊子。", translation: "Người phụ nữ thuật lại nguyên nhân: Nửa đêm hôm qua trong nhà bay vào rất nhiều muỗi." },
  { id: "d20", type: "dictation", text: "丈夫为了不让老婆被蚊子咬，打了一夜的蚊子，所以太累了。", translation: "Chồng cô để không cho vợ bị muỗi đốt, đã đập muỗi cả đêm, nên quá mệt mỏi." },
  { id: "d21", type: "dictation", text: "虽然半夜打蚊子有些吵，但妻子觉得很幸福。", translation: "Tuy nửa đêm đập muỗi có chút ồn ào, nhưng người vợ cảm thấy rất hạnh phúc." },
  { id: "d22", type: "dictation", text: "评委们认为，真正的爱往往体现在生活细节中，他们才是一对真正患难与共的夫妻。", translation: "Các giám khảo cho rằng, tình yêu đích thực thường thể hiện qua những chi tiết nhỏ trong cuộc sống, họ mới thực sự là một cặp vợ chồng hoạn nạn có nhau." },
  { id: "d23", type: "dictation", text: "这项比赛最终选出了最恩爱的夫妻，也就是第三对夫妻。", translation: "Cuộc thi này cuối cùng đã chọn ra cặp vợ chồng ân ái nhất, cũng chính là cặp vợ chồng thứ ba." }
];

const finalData = [...newDictations, ...otherData];

fs.writeFileSync(path, JSON.stringify(finalData, null, 2), 'utf8');
console.log('Dictation data updated successfully!');
