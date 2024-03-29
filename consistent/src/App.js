import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import NewProjectPage from './components/pages/NewProjectPage';
import LoadFixturesPage from './components/pages/LoadFixturesPage';

import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ApplicationBar from './components/layout/ApplicationBar';

import {ProjectContextProvider} from './components/context/ProjectContext'
import {FilterContextProvider} from './components/context/FilterContext'
import {ViewportContextProvider} from './components/context/ViewportContext'

function App() {

  return (
    <>
      <BrowserRouter>
        <ProjectContextProvider>
          <FilterContextProvider>
            <ViewportContextProvider>
                <ApplicationBar />          
                <Routes>
                  <Route path="/" exact element={ <HomePage />} />
                  <Route path="/projects/_new" exact element={<NewProjectPage />} />
                  <Route path="/projects/_demo" exact element={<LoadFixturesPage />} />
                  <Route path="/projects/:projectId" exact element={<ProjectPage />} />
                  <Route path="/about" exact element={<AboutPage />} />
                </Routes>
            </ViewportContextProvider>
          </FilterContextProvider> 
        </ProjectContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
