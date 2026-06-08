import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LessonJourney from './pages/LessonJourney';
import Step1Recognition from './pages/steps/Step1Recognition';
import Step2Understanding from './pages/steps/Step2Understanding';
import Step3Listening from './pages/steps/Step3Listening';
import StepTranslation from './pages/steps/StepTranslation';
import Step4Sentence from './pages/steps/Step4Sentence';
import Step5Qna from './pages/steps/Step5Qna';
import Step4Practice from './pages/steps/Step4Practice';
import Step5Retell from './pages/steps/Step5Retell';
import Step6Assessment from './pages/steps/Step6Assessment';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lesson/:id" element={<LessonJourney />}>
          <Route index element={<Navigate to="recognition" replace />} />
          <Route path="recognition" element={<Step1Recognition />} />
          <Route path="understanding" element={<Step2Understanding />} />
          <Route path="listening" element={<Step3Listening />} />
          <Route path="translation" element={<StepTranslation />} />
          <Route path="sentence" element={<Step4Sentence />} />
          <Route path="qna" element={<Step5Qna />} />
          <Route path="practice" element={<Step4Practice />} />
          <Route path="retell-story" element={<Step5Retell />} />
          <Route path="assessment" element={<Step6Assessment />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
