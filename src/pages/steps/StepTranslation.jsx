import React, { useState } from 'react';
import { Eye, Languages, CheckCircle } from 'lucide-react';
import translations from '../../data/lesson1Step4ReverseTranslation.json';

export default function StepTranslation() {
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [userInputs, setUserInputs] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (id, value) => {
    setUserInputs(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="page-title">Bước 6: Dịch ngược (Reverse Translation)</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Luyện tư duy dịch thuật từ Tiếng Việt sang Tiếng Trung. Hãy tự dịch 20 câu dưới đây trước khi xem đáp án để khắc sâu từ vựng và ngữ pháp.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {translations.map((item, index) => (
          <div key={item.id} className="card" style={{ borderLeft: '4px solid var(--primary-color)' }}>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ 
                backgroundColor: 'var(--primary-color)', color: 'white', 
                width: '32px', height: '32px', borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '1rem', flexShrink: 0
              }}>
                {index + 1}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.5' }}>
                  {item.vietnamese}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {item.hints.map(hint => (
                    <span key={hint} style={{ 
                      fontSize: '0.85rem', backgroundColor: '#EEF2FF', color: '#4F46E5', 
                      padding: '0.2rem 0.6rem', borderRadius: '9999px', fontWeight: '500'
                    }}>
                      Gợi ý: {hint}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <textarea 
                className="form-input"
                style={{ width: '100%', height: '80px', resize: 'vertical' }}
                placeholder="Gõ bản dịch tiếng Trung của bạn vào đây..."
                value={userInputs[item.id] || ''}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
              />
            </div>

            <div>
              <button 
                className={`btn ${visibleAnswers[item.id] ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => toggleAnswer(item.id)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.95rem' }}
              >
                {visibleAnswers[item.id] ? <Eye size={18} /> : <CheckCircle size={18} />} 
                {visibleAnswers[item.id] ? 'Ẩn đáp án' : 'Kiểm tra đáp án'}
              </button>

              {visibleAnswers[item.id] && (
                <div className="animate-fade-in" style={{ 
                  marginTop: '1.5rem', padding: '1.5rem', backgroundColor: '#F0FDF4', 
                  borderRadius: 'var(--radius-md)', border: '1px solid #BBF7D0' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    <Languages size={20} /> Đáp án chuẩn HSK5:
                  </div>
                  <div style={{ fontSize: '1.35rem', color: '#064E3B', marginBottom: '0.5rem', fontWeight: '500' }}>
                    {item.chinese}
                  </div>
                  <div style={{ fontSize: '1rem', color: '#047857', fontStyle: 'italic' }}>
                    {item.pinyin}
                  </div>
                </div>
              )}
            </div>
            
          </div>
        ))}
      </div>

    </div>
  );
}
