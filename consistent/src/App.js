import { Route, Switch } from 'react-router-dom';

import ProjectsPage from './pages/ProjectsPage';
import ProjectPage from './pages/ProjectPage';
import ProjectTagsPage from './pages/ProjectTagsPage';
import TagPage from './pages/TagPage';
import HomePage from './pages/HomePage';
import NewProjectForm from './components/forms/NewProjectForm';
import NewTagForm from './components/forms/NewTagForm';
import Layout from './components/layout/Layout';

function App() {
  return (
     <>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/projects" exact>
            <ProjectsPage />
          </Route>
          <Route path="/projects/new">
            <ProjectPage />
          </Route>
        </Switch>
      </Layout>          
    </>
  );
}

export default App;
