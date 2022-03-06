import { Route, Switch } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import Layout from './components/layout/Layout';
import {ProjectContextProvider} from './components/context/ProjectContext'

function App() {

  return (
    <>      
      <Layout>
        <ProjectContextProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/projects/:projectId" exact component={ProjectPage} />
            <Route path="/projects/" exact component={ProjectPage} />
            <Route path="/about" exact component={AboutPage} />
          </Switch>
        </ProjectContextProvider>
      </Layout>
    </>
  );
}

export default App;
