import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import NewProjectPage from './components/pages/NewProjectPage';
import LoadFixturesPage from './components/pages/LoadFixturesPage';
import LoadProjectPage from './components/pages/LoadProjectPage';

import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import Navigation from './components/layout/Navigation';

import {ProjectContextProvider} from './components/context/ProjectContext'
import {FilterContextProvider} from './components/context/FilterContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <ProjectContextProvider>
          <FilterContextProvider>
            <Routes>
              <Route path="/" exact element={ <HomePage />} />
              <Route path="/projects/_new" exact element={<NewProjectPage />} />
              <Route path="/projects/_load" exact element={<LoadProjectPage />} />
              <Route path="/projects/_example" exact element={<LoadFixturesPage />} />
              <Route path="/projects/:projectId" exact element={<ProjectPage />} />
              <Route path="/about" exact element={<AboutPage />} />
            </Routes>
          </FilterContextProvider> 
        </ProjectContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
