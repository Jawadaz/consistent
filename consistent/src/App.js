import { Route, Switch } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import Layout from './components/layout/Layout';

function App() {

  return (
     <>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/projects/:projectId" exact component={ProjectPage} />
          <Route path="/projects/" exact component={ProjectPage} />
          <Route path="/about" exact component={AboutPage} />
        </Switch>
      </Layout>          
    </>
  );
}

export default App;
