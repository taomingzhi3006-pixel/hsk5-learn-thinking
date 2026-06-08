import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import exercises from '../../data/lesson1Step3Exercises.json';

export default function Step4Sentence() {
  const sentences = exercises.filter(e => e.type === 'sentence');

  const [sentenceVisible, setSentenceVisible] = useState({});

  const toggleSentence = (id) => setSentenceVisible(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="animate-fade-in">
      <h2 className="page-title">Bước 4: Đặt câu (Sentence Structure)</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Mỗi từ vựng, hãy tập tự đặt 2 câu theo 2 ngữ cảnh khác nhau: Bài Khóa (Story) và Doanh nghiệp (Business). Sau khi viết xong, mở xem câu mẫu để học hỏi cách hành văn.
      </p>
      
      {sentences.map((q, idx) => (
        <div key={q.id} className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <div style={{ 
              backgroundColor: 'var(--primary-color)', color: 'white', 
              width: '40px', height: '40px', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', fontSize: '1.2rem'
            }}>
              {idx + 1}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
              Từ vựng: <span style={{ color: 'var(--secondary-color)' }}>{q.word}</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {/* Story Context */}
            <div style={{ backgroundColor: '#F8FAFC', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📖 Ngữ cảnh Bài khóa
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                Gợi ý: {q.story.hint}
              </p>
              <textarea 
                className="form-input"
                style={{ width: '100%', height: '100px', resize: 'none', marginBottom: '1rem' }}
                placeholder="Tự đặt câu của bạn vào đây..."
              ></textarea>
            </div>

            {/* Business Context */}
            <div style={{ backgroundColor: '#F0FDF4', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #BBF7D0' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                💼 Ngữ cảnh Doanh nghiệp
              </div>
              <p style={{ color: '#15803D', fontSize: '0.95rem', marginBottom: '1rem' }}>
                Gợi ý: {q.business.hint}
              </p>
              <textarea 
                className="form-input"
                style={{ width: '100%', height: '100px', resize: 'none', marginBottom: '1rem', border: '1px solid #BBF7D0' }}
                placeholder="Tự đặt câu của bạn vào đây..."
              ></textarea>
            </div>
          </div>
          
          {/* Sample Answers Reveal */}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button 
              className="btn btn-secondary" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => toggleSentence(q.id)}
            >
              <Eye size={18} /> {sentenceVisible[q.id] ? 'Ẩn câu mẫu' : 'Xem câu mẫu'}
            </button>
            
            {sentenceVisible[q.id] && (
              <div className="animate-fade-in" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#0F172A', marginBottom: '0.5rem' }}>Mẫu Bài khóa:</div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{q.story.sampleAnswer}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{q.story.sampleTranslation}</div>
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#166534', marginBottom: '0.5rem' }}>Mẫu Doanh nghiệp:</div>
                  <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{q.business.sampleAnswer}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{q.business.sampleTranslation}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
