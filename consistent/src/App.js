import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ProjectPage from './components/pages/ProjectPage';
import NewProjectPage from './components/pages/NewProjectPage'
import LoadFixturessPage from './components/pages/LoadFixturesPage'
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import Layout from './components/layout/Layout';


import {ProjectContextProvider} from './components/context/ProjectContext'
import {FilterContextProvider} from './components/context/FilterContext'

function App() {

  return (
    <>
      <BrowserRouter>
        
        <ProjectContextProvider>       
           <Layout>
            <FilterContextProvider>          
              <Switch>
                  <Route path="/" exact component={HomePage} />
                  <Route path="/projects/_new" exact component={NewProjectPage} />
                  <Route path="/projects/_example" exact component={LoadFixturessPage} />
                  <Route path="/projects/:projectId" exact component={ProjectPage} />
                  {/* <Route path="/projects/" exact component={ProjectsPage} /> */}
                  <Route path="/about" exact component={AboutPage} />
              </Switch>
              </FilterContextProvider>     
             </Layout>
            </ProjectContextProvider>                
       
      </BrowserRouter>
    </>
  );
}

export default App;
