import React, { useState, useRef } from 'react';
import { Play, Pause, FastForward, Rewind, CheckCircle2, XCircle, CheckCircle } from 'lucide-react';
import lessons from '../../data/mockLessons.json';
import exercises from '../../data/lesson1Step3Exercises.json';
import { useOutletContext } from 'react-router-dom';

export default function Step3Listening() {
  const { lessonId } = useOutletContext();
  const lesson = lessons.find(l => l.id === lessonId);
  const audioRef = useRef(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Segregate exercises
  const dictations = exercises.filter(e => e.type === 'dictation');

  // States for interactive parts
  const [dictInputs, setDictInputs] = useState({});
  const [dictResults, setDictResults] = useState({});

  // Audio general controls
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  // Checking Logic
  const checkDictation = (id, text, answer) => {
    const cleanInput = text.replace(/[\s.,?!，。？！“”"']/g, '').toLowerCase();
    const cleanAnswer = answer.replace(/[\s.,?!，。？！“”"']/g, '').toLowerCase();
    const isCorrect = cleanInput === cleanAnswer;
    setDictResults(prev => ({ ...prev, [id]: isCorrect }));
  };

  // Progress calculations
  const totalCompleted = Object.keys(dictResults).length;
  const totalQuestions = dictations.length;
  const progressPercent = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  return (
    <div>
      <h2 className="page-title">Bước 3: Luyện nghe (Chép chính tả)</h2>
      <p className="page-subtitle" style={{ marginBottom: '1.5rem' }}>
        Phương pháp Nghe & Dịch ngược (Shadowing + Translation) hiệu quả nhất để làm chủ ngữ cảnh và từ vựng.
      </p>
      
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <span>Tiến độ hoàn thành</span>
          <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>{totalCompleted} / {totalQuestions} ({progressPercent}%)</span>
        </div>
        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--primary-color)', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>

      {/* General Audio Player */}
      <div className="card" style={{ marginBottom: '2rem', borderTop: '4px solid var(--secondary-color)', position: 'sticky', top: '1rem', zIndex: 10, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           🎧 Trình phát Audio Bài khóa
        </h3>
        <audio 
          ref={audioRef} 
          src={lesson?.audioFiles?.[0]} 
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onEnded={() => setIsPlaying(false)}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={() => skip(-5)}><Rewind size={20} /> -5s</button>
          <button className="btn btn-primary" style={{ width: '60px', height: '60px', borderRadius: '50%', padding: 0 }} onClick={togglePlay}>
            {isPlaying ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '4px' }} />}
          </button>
          <button className="btn btn-secondary" onClick={() => skip(5)}><FastForward size={20} /> +5s</button>
        </div>
      </div>

      {/* DICTATION CONTENT */}
      <div className="animate-fade-in">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Bật Audio gốc ở trên. Hãy nghe, đối chiếu với gợi ý Tiếng Việt và <strong>gõ lại nguyên văn câu Tiếng Trung</strong>.</p>
          
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {dictations.map((q, idx) => (
                <div key={q.id} style={{ paddingBottom: '1.5rem', borderBottom: idx === dictations.length - 1 ? 'none' : '1px dashed var(--border-color)' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '1.2rem', paddingTop: '0.2rem', width: '35px' }}>
                      {idx + 1}.
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <div style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '500' }}>
                        🇻🇳 {q.translation}
                      </div>
                      <input 
                        type="text" 
                        className="form-input" 
                        style={{ 
                          width: '100%', padding: '0.75rem 1rem', 
                          border: dictResults[q.id] === true ? '2px solid #10B981' : (dictResults[q.id] === false ? '2px solid #EF4444' : '1px solid var(--border-color)'), 
                          borderRadius: 'var(--radius-md)', outline: 'none', fontSize: '1.1rem',
                          backgroundColor: dictResults[q.id] !== undefined ? '#F8FAFC' : '#FFFFFF',
                          transition: 'all 0.2s'
                        }}
                        placeholder="✍️ Gõ lại nguyên câu chữ Hán mà bạn nghe được..."
                        value={dictInputs[q.id] || ''}
                        onChange={(e) => setDictInputs(prev => ({ ...prev, [q.id]: e.target.value }))}
                        disabled={dictResults[q.id] !== undefined}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && dictResults[q.id] === undefined && dictInputs[q.id]) {
                            checkDictation(q.id, dictInputs[q.id] || '', q.text);
                          }
                        }}
                      />
                      {/* Show correct answer if wrong */}
                      {dictResults[q.id] === false && (
                        <div style={{ backgroundColor: '#FEF2F2', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #EF4444' }}>
                          <p style={{ color: '#B91C1C', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>❌ Bạn chưa gõ đúng hoàn toàn. Đáp án chính xác là:</p>
                          <p style={{ color: '#7F1D1D', fontSize: '1.1rem', fontWeight: '500' }}>{q.text}</p>
                        </div>
                      )}
                      {dictResults[q.id] === true && (
                        <div style={{ color: '#10B981', fontSize: '0.95rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <CheckCircle size={18} /> Chính xác tuyệt đối!
                        </div>
                      )}
                    </div>
                    {dictResults[q.id] === undefined && (
                      <button 
                        className="btn btn-primary" 
                        style={{ marginTop: '2.5rem' }}
                        onClick={() => checkDictation(q.id, dictInputs[q.id] || '', q.text)}
                        disabled={!dictInputs[q.id]}
                      >
                        Kiểm tra
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
