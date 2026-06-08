import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, MousePointerClick, RefreshCw } from 'lucide-react';
import allQuestions from '../../data/lesson1Step6Exercises.json';

const types = [
  'Đọc hiểu điền từ', 
  'Chọn từ đúng ngữ cảnh', 
  'Sắp xếp câu (Mô phỏng viết HSK5)'
];

export default function Step6Assessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState(types[0]);

  const handleSelect = (qId, option) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const calculateScore = () => {
    return allQuestions.filter(q => answers[q.id] === q.answer).length;
  };

  const reset = () => {
    if (window.confirm("Bạn có chắc muốn làm lại bài thi từ đầu? Toàn bộ kết quả 60 câu sẽ bị xóa.")) {
      setAnswers({});
      setSubmitted(false);
      setActiveTab(types[0]);
    }
  };

  const currentQuestions = allQuestions.filter(q => q.type === activeTab);
  const isAllAnswered = Object.keys(answers).length === allQuestions.length;

  return (
    <div>
      <h2 className="page-title">Bước 8: Đánh giá Năng lực (HSK5 Standard)</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Hoàn thành bài kiểm tra 60 câu mô phỏng đề thi HSK5 thực tế, tập trung hoàn toàn vào nội dung Bài khóa 1.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem' }}>
        {types.map((type, index) => {
          const isActive = activeTab === type;
          const answeredInTab = allQuestions.filter(q => q.type === type && answers[q.id]).length;
          const totalInTab = allQuestions.filter(q => q.type === type).length;
          
          return (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--primary-color)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                fontWeight: isActive ? 'bold' : '500',
                border: isActive ? 'none' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.25rem'
              }}
            >
              <span>Phần {index + 1}: {type}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                ({answeredInTab}/{totalInTab} câu)
              </span>
            </button>
          )
        })}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        {currentQuestions.map((q, index) => (
          <div key={q.id} className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', borderLeft: submitted ? (answers[q.id] === q.answer ? '4px solid #10B981' : '4px solid #EF4444') : '4px solid var(--border-color)' }}>
            <div style={{ color: 'var(--secondary-color)', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Câu {index + 1}
            </div>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', color: 'var(--text-primary)', fontWeight: '500', lineHeight: '1.6' }}>
              {q.text}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {q.options.map(opt => {
                const isSelected = answers[q.id] === opt;
                const isCorrectAnswer = opt === q.answer;
                
                let bgColor = '#FFFFFF';
                let borderColor = 'var(--border-color)';
                let textColor = 'var(--text-primary)';

                if (submitted) {
                  if (isCorrectAnswer) {
                    bgColor = '#F0FDF4';
                    borderColor = '#10B981';
                    textColor = '#047857';
                  } else if (isSelected && !isCorrectAnswer) {
                    bgColor = '#FEF2F2';
                    borderColor = '#EF4444';
                    textColor = '#B91C1C';
                  }
                } else if (isSelected) {
                  bgColor = '#EFF6FF';
                  borderColor = 'var(--secondary-color)';
                  textColor = 'var(--secondary-color)';
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(q.id, opt)}
                    style={{
                      padding: '1rem',
                      textAlign: 'left',
                      borderRadius: 'var(--radius-md)',
                      border: `1px solid ${borderColor}`,
                      backgroundColor: bgColor,
                      color: textColor,
                      cursor: submitted ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: isSelected ? '600' : '400'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{opt}</span>
                      {submitted && isCorrectAnswer && <CheckCircle size={18} color="#10B981" />}
                      {submitted && isSelected && !isCorrectAnswer && <XCircle size={18} color="#EF4444" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--border-color)', paddingTop: '2rem', paddingBottom: '2rem' }}>
        {!submitted ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', justifyContent: 'center', opacity: !isAllAnswered ? 0.6 : 1 }}
              disabled={!isAllAnswered}
              onClick={() => {
                if(window.confirm("Bạn chắc chắn muốn nộp bài chứ?")) {
                  setSubmitted(true);
                  window.scrollTo(0, 0);
                }
              }}
            >
              <MousePointerClick size={24} /> 
              {isAllAnswered ? 'NỘP BÀI CHẤM ĐIỂM TỔNG' : `Vui lòng điền đủ 60 câu để Nộp bài (${Object.keys(answers).length}/60)`}
            </button>
          </div>
        ) : (
          <div className="card animate-fade-in" style={{ backgroundColor: '#F0FDF4', border: '2px solid #10B981', textAlign: 'center', width: '100%', padding: '2rem' }}>
            <Award size={64} color="#10B981" style={{ margin: '0 auto', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.75rem', color: '#047857', marginBottom: '0.5rem' }}>
              Kết quả bài thi HSK5
            </h3>
            <p style={{ fontSize: '1.5rem', color: '#065F46', fontWeight: 'bold', marginBottom: '1.5rem' }}>
              Bạn đã đúng {calculateScore()}/{allQuestions.length} câu.
            </p>
            <button className="btn btn-secondary" onClick={reset} style={{ margin: '0 auto' }}>
              <RefreshCw size={20} /> Làm lại bài thi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
