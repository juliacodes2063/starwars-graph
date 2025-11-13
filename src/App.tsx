import { Routes, Route, Navigate } from 'react-router-dom';
import { HeroDetailsPage } from './pages/HeroDetailsPage';
import { HeroesPage } from './pages/HeroesPage';
import './styles/App.scss';
import { Header } from './shared/components/ Header';
import { BackgroundBlobs } from './shared/components/BackgroundBlobs';

function App() {
  return (
    <div className="appShell">
      <BackgroundBlobs />
      <Header />

      <main className="appShell-main">
        <Routes>
          <Route path="/" element={<HeroesPage />} />
          <Route path="/people/:id" element={<HeroDetailsPage />} />
          {/* fallback to list */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
