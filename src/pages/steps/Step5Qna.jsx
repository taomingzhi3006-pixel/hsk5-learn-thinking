import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import exercises from '../../data/lesson1Step3Exercises.json';

export default function Step5Qna() {
  const qnas = exercises.filter(e => e.type === 'qna');

  const [qnaAnswers, setQnaAnswers] = useState({});
  const [qnaResults, setQnaResults] = useState({});

  const handleQnaSelect = (id, option, answer) => {
    if (qnaResults[id] !== undefined) return; // locked after answering
    const isCorrect = option === answer;
    setQnaAnswers(prev => ({ ...prev, [id]: option }));
    setQnaResults(prev => ({ ...prev, [id]: isCorrect }));
  };

  return (
    <div className="animate-fade-in">
      <h2 className="page-title">Bước 5: Trả lời câu hỏi</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Kiểm tra độ hiểu sâu bài khóa thông qua các câu hỏi đọc hiểu và từ vựng.
      </p>
      
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {qnas.map((q, idx) => (
            <div key={q.id} style={{ paddingBottom: '1.5rem', borderBottom: idx === qnas.length - 1 ? 'none' : '1px dashed var(--border-color)' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                {idx + 1}. {q.question}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {q.options.map((opt, oIdx) => {
                  const isSelected = qnaAnswers[q.id] === opt;
                  const isCorrectAnswer = opt === q.answer;
                  const hasAnswered = qnaResults[q.id] !== undefined;
                  
                  let bgColor = '#F8FAFC';
                  let borderColor = 'var(--border-color)';
                  let color = 'var(--text-primary)';
                  
                  if (hasAnswered) {
                    if (isCorrectAnswer) {
                      bgColor = '#ECFDF5';
                      borderColor = '#10B981';
                      color = '#065F46';
                    } else if (isSelected && !isCorrectAnswer) {
                      bgColor = '#FEF2F2';
                      borderColor = '#EF4444';
                      color = '#B91C1C';
                    }
                  } else if (isSelected) {
                    borderColor = 'var(--primary-color)';
                    bgColor = '#EFF6FF';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleQnaSelect(q.id, opt, q.answer)}
                      disabled={hasAnswered}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: `1px solid ${borderColor}`,
                        backgroundColor: bgColor,
                        color: color,
                        textAlign: 'left',
                        cursor: hasAnswered ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                      className={hasAnswered ? '' : 'hover-border-primary'}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrectAnswer && <CheckCircle2 size={20} color="#10B981" />}
                      {hasAnswered && isSelected && !isCorrectAnswer && <XCircle size={20} color="#EF4444" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
