import React, { useState, useEffect } from 'react';
import { FileText, Eye, CheckCircle2, ChevronRight } from 'lucide-react';
import step5Data from '../../data/lesson1Step5Data.json';

export default function Step5Retell() {
  const [summaryText, setSummaryText] = useState('');
  const [showSample, setShowSample] = useState(false);
  const [usedKeywords, setUsedKeywords] = useState({});

  useEffect(() => {
    // Check which keywords are used in the text
    const used = {};
    step5Data.keywords.forEach(kw => {
      if (summaryText.includes(kw)) {
        used[kw] = true;
      }
    });
    setUsedKeywords(used);
  }, [summaryText]);

  const usedCount = Object.keys(usedKeywords).length;
  const totalKeywords = step5Data.keywords.length;
  const progress = Math.round((usedCount / totalKeywords) * 100);

  return (
    <div>
      <h2 className="page-title">Bước 7: Kể lại (Story Retelling)</h2>
      <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
        Tự kể lại toàn bộ câu chuyện theo trình tự thời gian bằng ngôn từ của chính bạn. Phương pháp này giúp khắc sâu ngữ pháp và toàn bộ từ mới vào trí nhớ dài hạn.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
        
        {/* Main Editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="var(--primary-color)" /> Khu vực Soạn thảo
            </h3>
            <textarea 
              style={{ 
                width: '100%', 
                minHeight: '300px', 
                padding: '1rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--border-color)', 
                resize: 'vertical', 
                fontFamily: 'inherit',
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}
              placeholder="Hãy bắt đầu kể lại câu chuyện... (Ví dụ: 电台要选出一对最恩爱的夫妻...)"
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
            />
            
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                className="btn btn-primary"
                onClick={() => setShowSample(!showSample)}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <Eye size={20} /> {showSample ? 'Ẩn Bài Mẫu' : 'Xem Bài Mẫu HSK5'}
              </button>
            </div>
          </div>

          {showSample && (
            <div className="card animate-fade-in" style={{ backgroundColor: '#F0FDF4', border: '1px solid #A7F3D0', padding: '2rem' }}>
              <h3 style={{ color: '#065F46', marginBottom: '1.5rem', fontSize: '1.25rem', borderBottom: '2px solid #D1FAE5', paddingBottom: '0.5rem' }}>
                Bài tóm tắt tham khảo (Mẫu chuẩn)
              </h3>
              <p style={{ fontSize: '1.2rem', lineHeight: '2', color: '#064E3B', marginBottom: '1rem', fontWeight: '500' }}>
                {step5Data.sampleSummary.chinese}
              </p>
              <p style={{ fontSize: '1.05rem', color: '#047857', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                {step5Data.sampleSummary.pinyin}
              </p>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #34D399' }}>
                <p style={{ color: '#065F46', fontSize: '1rem', lineHeight: '1.6' }}>
                  {step5Data.sampleSummary.translation}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar: Timeline & Keywords */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '1.5rem', backgroundColor: '#F8FAFC' }}>
            <h4 style={{ color: '#0F172A', marginBottom: '1rem', fontSize: '1.1rem' }}>⏱️ Trục Thời Gian</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {step5Data.milestones.map((ms, index) => (
                <div key={ms.id} style={{ position: 'relative', paddingLeft: '1.5rem' }}>
                  <div style={{ position: 'absolute', left: 0, top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }}></div>
                  {index < step5Data.milestones.length - 1 && (
                    <div style={{ position: 'absolute', left: '4px', top: '16px', bottom: '-16px', width: '2px', backgroundColor: '#CBD5E1' }}></div>
                  )}
                  <div style={{ fontWeight: 'bold', color: 'var(--primary-color)', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{ms.time}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{ms.hint}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#0F172A', fontSize: '1.1rem' }}>🎯 Từ vựng ép dùng</h4>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: progress === 100 ? '#10B981' : 'var(--primary-color)' }}>
                {usedCount}/{totalKeywords}
              </span>
            </div>
            
            <div style={{ width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '4px', marginBottom: '1rem', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: progress === 100 ? '#10B981' : 'var(--primary-color)', width: `${progress}%`, transition: 'width 0.3s ease' }}></div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {step5Data.keywords.map(kw => {
                const isUsed = usedKeywords[kw];
                return (
                  <span 
                    key={kw} 
                    style={{ 
                      padding: '0.3rem 0.6rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.9rem',
                      fontWeight: isUsed ? 'bold' : 'normal',
                      backgroundColor: isUsed ? '#D1FAE5' : '#F1F5F9',
                      color: isUsed ? '#059669' : '#64748B',
                      border: isUsed ? '1px solid #10B981' : '1px solid #CBD5E1',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {isUsed && <CheckCircle2 size={14} />} {kw}
                  </span>
                )
              })}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem', fontStyle: 'italic' }}>
              * Gõ từ vựng vào bài viết của bạn, hệ thống sẽ tự động nhận diện và tích xanh.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
