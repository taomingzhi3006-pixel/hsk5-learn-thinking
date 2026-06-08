import React, { useState } from 'react';
import { CheckCircle2, XCircle, RefreshCw, MousePointerClick, ChevronLeft, ChevronRight } from 'lucide-react';
import allExercises from '../../data/lesson1Step4Exercises.json';

const ITEMS_PER_PAGE = 10;
const totalPages = Math.ceil(allExercises.length / ITEMS_PER_PAGE);

export default function Step4Practice() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState({}); // { pageNumber: boolean }
  const [currentPage, setCurrentPage] = useState(1);

  const currentExercises = allExercises.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const isPageChecked = showResults[currentPage] || false;
  const isPageComplete = currentExercises.every(ex => answers[ex.id]);

  const handleSelect = (exId, option) => {
    if (isPageChecked) return;
    setAnswers(prev => ({ ...prev, [exId]: option }));
  };

  const checkAnswers = () => {
    setShowResults(prev => ({ ...prev, [currentPage]: true }));
  };

  const reset = () => {
    if (window.confirm("Bạn có chắc muốn làm lại từ đầu? Toàn bộ kết quả 100 câu sẽ bị xóa.")) {
      setAnswers({});
      setShowResults({});
      setCurrentPage(1);
    }
  };

  const score = Object.keys(answers).filter(id => answers[id] === allExercises.find(e => e.id === Number(id)).answer).length;

  return (
    <div>
      <h2 className="page-title">Bước 6: Trắc nghiệm tổng hợp</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Hoàn thành các câu sau bằng cách chọn từ vựng phù hợp. Hệ thống gồm 100 câu xáo trộn ngữ cảnh: Bài khóa, Đời sống, và Doanh nghiệp.
      </p>

      {/* Pagination Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>
          Tiến độ: <span style={{ color: 'var(--primary-color)' }}>{Object.keys(answers).length} / {allExercises.length}</span> câu
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            style={{ padding: '0.5rem 1rem' }}
          >
            <ChevronLeft size={20} /> Trước
          </button>
          <span style={{ fontWeight: 'bold' }}>Trang {currentPage} / {totalPages}</span>
          <button 
            className="btn btn-secondary" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            style={{ padding: '0.5rem 1rem' }}
          >
            Sau <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
        {currentExercises.map((ex, idx) => {
          const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + idx + 1;
          const userAnswer = answers[ex.id];
          const isCorrect = userAnswer === ex.answer;
          
          return (
            <div key={ex.id} className="card" style={{ padding: '1.5rem', borderLeft: isPageChecked ? (isCorrect ? '4px solid #10B981' : '4px solid #EF4444') : '4px solid var(--border-color)', transition: 'border-color 0.3s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', backgroundColor: '#E2E8F0', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#475569' }}>
                  {ex.context}
                </span>
              </div>
              
              <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: '500', lineHeight: '1.6' }}>
                {globalIndex}. {ex.sentence.split('_____').map((part, i) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && (
                      <span style={{ 
                        display: 'inline-block', 
                        minWidth: '80px', 
                        borderBottom: '2px solid',
                        borderBottomColor: isPageChecked ? (isCorrect ? '#10B981' : '#EF4444') : 'var(--primary-color)',
                        textAlign: 'center', 
                        color: isPageChecked ? (isCorrect ? '#10B981' : '#EF4444') : 'var(--secondary-color)',
                        fontWeight: 'bold',
                        padding: '0 0.5rem',
                        transition: 'all 0.3s ease'
                      }}>
                        {userAnswer || '_____'}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                {ex.translation}
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {ex.options.map(opt => (
                  <button 
                    key={opt}
                    onClick={() => handleSelect(ex.id, opt)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      borderRadius: '9999px',
                      border: '1px solid',
                      borderColor: userAnswer === opt ? 'var(--secondary-color)' : 'var(--border-color)',
                      backgroundColor: userAnswer === opt ? '#EFF6FF' : '#FFFFFF',
                      color: userAnswer === opt ? 'var(--secondary-color)' : 'var(--text-primary)',
                      cursor: isPageChecked ? 'default' : 'pointer',
                      fontWeight: userAnswer === opt ? '600' : '400',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {isPageChecked && (
                <div className="animate-fade-in" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: isCorrect ? '#10B981' : '#EF4444' }}>
                  {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                  <span style={{ fontWeight: '500' }}>{isCorrect ? 'Chính xác!' : `Sai rồi, đáp án đúng là: ${ex.answer}`}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {!isPageChecked ? (
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', opacity: !isPageComplete ? 0.5 : 1 }}
              onClick={checkAnswers}
              disabled={!isPageComplete}
            >
              <MousePointerClick size={20} />
              {!isPageComplete ? 'Vui lòng điền hết 10 câu để kiểm tra' : 'Kiểm tra đáp án trang này'}
            </button>
          ) : (
            <button 
              className="btn btn-primary" 
              style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
              onClick={() => {
                if (currentPage < totalPages) setCurrentPage(p => p + 1);
              }}
              disabled={currentPage === totalPages}
            >
              {currentPage === totalPages ? 'Bạn đã hoàn thành 100 câu!' : 'Chuyển sang trang tiếp theo'}
            </button>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            Tổng điểm: {score}/{allExercises.length}
          </span>
          <button className="btn btn-secondary" onClick={reset} style={{ padding: '0.5rem 1rem' }}>
            <RefreshCw size={18} /> Làm lại từ đầu
          </button>
        </div>
      </div>
    </div>
  );
}
