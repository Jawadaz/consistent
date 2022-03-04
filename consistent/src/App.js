import { Route, Switch } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import HomePage from './components/pages/HomePage';
import Layout from './components/layout/Layout';

function App() {

  return (
     <>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/projects/:projectId" exact>
            <ProjectPage />
          </Route>
          <Route path="/projects/" exact>
            <ProjectPage />
          </Route>
        </Switch>
      </Layout>          
    </>
  );
}

export default App;
