import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Briefcase, Award } from 'lucide-react';
import lessons from '../data/mockLessons.json';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="page-title" style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--secondary-color)' }}>
          HSK5 Learn-Thinking
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button className="btn" style={{ justifyContent: 'flex-start', backgroundColor: 'var(--hover-bg)' }}>
            <BookOpen size={18} /> Các khóa học
          </button>
          <button className="btn" style={{ justifyContent: 'flex-start' }}>
            <Briefcase size={18} /> Góc doanh nghiệp
          </button>
          <button className="btn" style={{ justifyContent: 'flex-start' }}>
            <Award size={18} /> Đánh giá năng lực
          </button>
        </nav>
      </div>
      <div className="main-content">
        <div className="page-header">
          <h1 className="page-title">Chào mừng trở lại!</h1>
          <p className="page-subtitle">Tiếp tục hành trình chinh phục HSK5 và tiếng Trung thương mại.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {lessons.map(lesson => (
            <div key={lesson.id} className="card animate-fade-in" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {lesson.coverImage && (
                <div style={{ width: '100%', height: '180px', backgroundImage: `url(${lesson.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid var(--border-color)' }}></div>
              )}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', color: '#0F172A', lineHeight: '1.4' }}>{lesson.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.5' }}>
                  {lesson.description}
                </p>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    <span>Tiến độ học tập</span>
                    <span style={{ color: 'var(--primary-color)' }}>{Math.round((lesson.progress / lesson.totalSteps) * 100)}%</span>
                  </div>
                  <div style={{ background: '#E2E8F0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(lesson.progress / lesson.totalSteps) * 100}%`, background: 'var(--primary-color)', height: '100%', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', justifyContent: 'center', padding: '0.75rem' }}
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                >
                  Bắt đầu học ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
