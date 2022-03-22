import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import NewProjectPage from './components/pages/NewProjectPage'
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import Layout from './components/layout/Layout';
import {ProjectContextProvider} from './components/context/ProjectContext'

function App() {

  return (
    <>
      <BrowserRouter>
       
          <ProjectContextProvider>
          <Layout>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/projects/new" exact component={NewProjectPage} />
                <Route path="/projects/:projectId" exact component={ProjectPage} />
                {/* <Route path="/projects/" exact component={ProjectsPage} /> */}
                <Route path="/about" exact component={AboutPage} />
              </Switch>
            </Layout>
          </ProjectContextProvider>
      
      </BrowserRouter>
    </>
  );
}

export default App;
