import React from 'react';
import { Outlet, NavLink, useParams, useNavigate } from 'react-router-dom';
import { Eye, Brain, Headphones, PenTool, FileText, CheckSquare, ArrowLeft, Edit2, HelpCircle } from 'lucide-react';
import lessons from '../data/mockLessons.json';

const steps = [
  { id: 'recognition', title: '1. Nhận diện', icon: Eye },
  { id: 'understanding', title: '2. Hiểu bản chất', icon: Brain },
  { id: 'listening', title: '3. Luyện nghe', icon: Headphones },
  { id: 'translation', title: '4. Dịch ngược', icon: PenTool },
  { id: 'sentence', title: '5. Đặt câu', icon: Edit2 },
  { id: 'qna', title: '6. Trả lời câu hỏi', icon: HelpCircle },
  { id: 'practice', title: '7. Trắc nghiệm', icon: PenTool },
  { id: 'retell-story', title: '8. Tóm tắt', icon: FileText },
  { id: 'assessment', title: '9. Đánh giá', icon: CheckSquare },
];

export default function LessonJourney() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentLesson = lessons.find(l => l.id === id);

  return (
    <div className="app-container">
      <div className="sidebar" style={{ width: '280px', zIndex: 10 }}>
        <button 
          className="btn" 
          style={{ justifyContent: 'flex-start', marginBottom: '2rem', padding: '0' }}
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={18} /> Quay lại Dashboard
        </button>
        
        <h2 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Hành trình Learn-Thinking</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {steps.map(step => {
            const Icon = step.icon;
            return (
              <NavLink 
                key={step.id} 
                to={step.id}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  textDecoration: 'none',
                  color: isActive ? 'var(--secondary-color)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--hover-bg)' : 'transparent',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all var(--transition-fast)'
                })}
              >
                <Icon size={18} />
                {step.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      <div className="main-content" style={{ 
        backgroundColor: '#f8fafc', 
        borderRadius: 'var(--radius-xl) 0 0 0', 
        boxShadow: '-5px 0 15px rgba(0,0,0,0.05)',
        position: 'relative',
        overflow: 'auto'
      }}>
        {currentLesson?.coverImage && (
          <div 
            style={{
              position: 'fixed',
              top: 0, left: '280px', right: 0, bottom: 0,
              backgroundImage: `url(${currentLesson.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.25,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        )}
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
           <Outlet context={{ lessonId: id }} />
        </div>
      </div>
    </div>
  );
}
