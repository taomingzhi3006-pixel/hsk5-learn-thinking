import React, { useState } from 'react';
import { User, Briefcase, BrainCircuit } from 'lucide-react';
import vocabulary from '../../data/lesson1Vocab.json';

export default function Step1Recognition() {
  const [activeWord, setActiveWord] = useState(null);

  return (
    <div>
      <h2 className="page-title">Bước 1: Nhận diện từ vựng</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Học tất cả 38 từ vựng HSK5 Bài 1 với phương pháp tách bộ Hán Việt và ví dụ thực tế.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        {vocabulary.map((word, index) => (
          <div 
            key={index} 
            className="card" 
            style={{ 
              cursor: 'pointer', 
              border: activeWord === index ? '2px solid var(--secondary-color)' : '1px solid var(--border-color)',
              padding: '1.5rem',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setActiveWord(activeWord === index ? null : index)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                  {word.hanzi}
                </span>
                <div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>{word.pinyin}</div>
                  <div style={{ fontWeight: '500', color: 'var(--accent-color)' }}>{word.meaning}</div>
                </div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {activeWord === index ? 'Thu gọn' : 'Chi tiết & Ví dụ'}
              </div>
            </div>
            
            {activeWord === index && (
              <div className="animate-fade-in" style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
                
                {/* Hán Việt & Phân tích */}
                <div style={{ backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #EF4444', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontWeight: '600', color: '#7F1D1D' }}>
                    <BrainCircuit size={18} color="#EF4444" /> Tư duy gốc từ (Chiết tự & Hán Việt)
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#991B1B', lineHeight: '1.6' }}>{word.analysis}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #3B82F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '600', color: '#1E293B' }}>
                      <User size={18} color="#3B82F6" /> Bản thân (Đời sống)
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{word.personalExample}</p>
                  </div>
                  
                  <div style={{ backgroundColor: '#F0FDF4', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #10B981' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: '600', color: '#1E293B' }}>
                      <Briefcase size={18} color="#10B981" /> Doanh nghiệp (Công sở)
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{word.businessExample}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="card">
        <h3>💡 Mẹo ghi nhớ (Learn-Thinking)</h3>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          Bằng cách hiểu <strong>âm Hán Việt và chiết tự</strong>, bạn đang cung cấp cho não bộ "logic" để nhớ mặt chữ một cách tự nhiên. Kết hợp với <strong>2 ví dụ đối lập</strong>, bạn tạo ra hai đầu nối: một vào ký ức cảm xúc cá nhân, một vào kỹ năng làm việc thực chiến. Từ vựng sẽ được khắc sâu thay vì chỉ học vẹt.
        </p>
      </div>
    </div>
  );
}
