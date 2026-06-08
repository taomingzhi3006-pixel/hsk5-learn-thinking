import React from 'react';
import { Lightbulb, Target, BookOpen, Layers, Briefcase, User } from 'lucide-react';

export default function Step2Understanding() {
  const grammarPoints = [
    {
      id: 1,
      word: '如何',
      pinyin: 'rúhé',
      translation: 'Như thế nào, ra sao',
      type: '代词 (Đại từ nghi vấn)',
      structures: [
        'Chủ ngữ + 如何 + Động từ ? (Làm thế nào để...)',
        '... , (tình hình) 如何? (Dùng ở cuối câu để hỏi thăm tình hình, xin ý kiến)'
      ],
      explanation: 'Dùng để hỏi phương thức, cách thức (tương tự 怎么 nhưng mang tính trang trọng, văn viết). Rất thường dùng trong email hoặc văn bản công ty.',
      examples: [
        { ctx: 'personal', text: '你最近身体如何？', meaning: 'Gần đây sức khỏe của bạn thế nào?' },
        { ctx: 'personal', text: '我不知道如何开口跟他说这件事。', meaning: 'Tôi không biết làm thế nào để mở lời nói với anh ấy chuyện này.' },
        { ctx: 'business', text: '我们明天举行会议，讨论这个问题该如何解决。', meaning: 'Ngày mai chúng ta mở cuộc họp, thảo luận xem vấn đề này nên giải quyết thế nào.' },
        { ctx: 'business', text: '请指示我们如何推进这个项目。', meaning: 'Xin hãy chỉ thị cho chúng tôi làm thế nào để thúc đẩy dự án này.' },
        { ctx: 'business', text: '面对激烈的竞争，公司如何保持优势？', meaning: 'Đối mặt với sự cạnh tranh khốc liệt, công ty làm thế nào để duy trì ưu thế?' }
      ]
    },
    {
      id: 2,
      word: '靠',
      pinyin: 'kào',
      translation: 'Dựa, tựa, nhờ cậy, gần',
      type: '动词 (Động từ)',
      structures: [
        '靠(着) + Danh từ (Dựa, tựa vào bề mặt vật lý)',
        '靠 + Người/Sự vật + Động từ (Nhờ cậy vào ai/cái gì để sống, làm việc)',
        '靠 + Phương hướng/Vị trí (Gần, sát với vị trí nào đó)'
      ],
      explanation: 'Một từ đa nghĩa cực kỳ phổ biến. Vừa chỉ hành động vật lý (tựa vào), vừa chỉ ý nghĩa trừu tượng (dựa dẫm, phụ thuộc).',
      examples: [
        { ctx: 'personal', text: '男人的头靠在女人的肩膀上睡着了。', meaning: 'Đầu người đàn ông tựa vào vai người phụ nữ và ngủ thiếp đi.' },
        { ctx: 'personal', text: '我的座位是17号，是靠窗的座位。', meaning: 'Chỗ ngồi của tôi là số 17, là ghế sát cửa sổ.' },
        { ctx: 'personal', text: '在家靠父母，出门靠朋友。', meaning: 'Ở nhà nhờ bố mẹ, ra đường nhờ bạn bè.' },
        { ctx: 'business', text: '现在的企业不能只靠打价格战。', meaning: 'Các doanh nghiệp hiện nay không thể chỉ dựa vào chiến tranh giá cả.' },
        { ctx: 'business', text: '我们的业务主要靠老客户推荐。', meaning: 'Nghiệp vụ của chúng tôi chủ yếu nhờ vào khách hàng cũ giới thiệu.' }
      ]
    },
    {
      id: 3,
      word: '居然',
      pinyin: 'jūrán',
      translation: 'Lại, lại có thể',
      type: '副词 (Phó từ)',
      structures: [
        'Chủ ngữ + 居然 + Động từ / Tính từ'
      ],
      explanation: 'Biểu thị sự kinh ngạc, hoàn toàn ngoài dự kiến. Cảm xúc mạnh hơn 竟然 (jìngrán). Thường đi kèm với giọng điệu ngạc nhiên hoặc khó tin.',
      examples: [
        { ctx: 'personal', text: '这么简单的题，你居然也不会做？', meaning: 'Câu hỏi đơn giản thế này, cậu lại không biết làm?' },
        { ctx: 'personal', text: '大家都以为他会迟到，他居然第一个到。', meaning: 'Mọi người đều nghĩ anh ta sẽ đến muộn, anh ta LẠI đến đầu tiên.' },
        { ctx: 'personal', text: '为了不影响丈夫睡觉，她居然放弃了这次机会！', meaning: 'Vì không muốn ảnh hưởng giấc ngủ của chồng, cô ấy LẠI từ bỏ cơ hội này!' },
        { ctx: 'business', text: '竞争对手居然比我们先发布了新产品！', meaning: 'Đối thủ cạnh tranh LẠI CÓ THỂ phát hành sản phẩm mới trước chúng ta!' },
        { ctx: 'business', text: '这么大的一家公司，居然连个像样的网站都没有。', meaning: 'Một công ty lớn như vậy, LẠI CÓ THỂ không có nổi một trang web tử tế.' }
      ]
    }
  ];

  return (
    <div>
      <h2 className="page-title">Bước 2: Hiểu bản chất (Ngữ pháp & Cấu trúc)</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Phân tích loại từ, cấu trúc câu và ứng dụng qua 5 ví dụ thực tế (Đời sống & Doanh nghiệp).
      </p>

      {grammarPoints.map((grammar, index) => (
        <div key={index} className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--secondary-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.75rem', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Target size={28} color="var(--secondary-color)" /> 
                {index + 1}. {grammar.word} 
                <span style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', fontWeight: 'normal' }}>({grammar.pinyin})</span>
                <span style={{ fontSize: '1.125rem', color: 'var(--accent-color)', fontWeight: 'normal' }}>- {grammar.translation}</span>
              </h3>
            </div>
            <div style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontWeight: '600', fontSize: '0.875rem' }}>
              {grammar.type}
            </div>
          </div>

          <p style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.6' }}>
            <strong>Bản chất:</strong> {grammar.explanation}
          </p>

          <div style={{ backgroundColor: '#F8FAFC', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #94A3B8', marginBottom: '2rem' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#334155' }}>
              <Layers size={18} /> Cấu trúc câu
            </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {grammar.structures.map((struct, i) => (
                <li key={i} style={{ fontSize: '0.95rem' }}>{struct}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>
              <BookOpen size={18} /> 5 Ví dụ ứng dụng
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {grammar.examples.map((ex, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', backgroundColor: ex.ctx === 'business' ? '#F0FDF4' : '#FFFFFF', border: '1px solid', borderColor: ex.ctx === 'business' ? '#D1FAE5' : 'var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ marginTop: '0.125rem' }}>
                    {ex.ctx === 'business' ? <Briefcase size={20} color="#10B981" /> : <User size={20} color="#3B82F6" />}
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{ex.text}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ex.meaning}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Lightbulb size={20} color="#F59E0B" /> Mindset cho người đi làm
        </h3>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Ngữ pháp không phải là công thức toán học chết cứng. Bằng cách quan sát <strong>Cấu trúc</strong> đi liền với <strong>5 ví dụ lặp lại ở cả đời sống và công việc</strong>, bạn sẽ tự động "cảm" được từ đó, giống như cách người bản xứ tư duy. Hãy thử lấy một ví dụ Doanh nghiệp ở trên và tự thay đổi chủ ngữ/tân ngữ cho phù hợp với công ty của bạn.
        </p>
      </div>
    </div>
  );
}
