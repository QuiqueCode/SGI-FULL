import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */


/* Theme variables */
import './theme/variables.css';
import Login from './views/LoginView/LoginV';
import CIncident from './views/CreateIncident/CIncidentV';
import CDiagnosis from './views/CreateDiagnosis/CDiagnosis';
import IncidentList from './views/IncidentListManager/IncidentList';
import { RolSelector } from './views/RolSelector/RolSelectorV';
import { IncidentTechnicalV } from './views/IncidentTechnicalV/IncidentTechnicalV';
import TechnicalIncidentList from './views/TechnicalIncidentListV/TechnicalIncidenListV';
import { UserIncidentList } from './views/UserIncidentList/UserIncidentList';
import { DetailIncidentManagerV } from './views/AsignIncidentV/DetailIncidenManagerV';
import { TechnicianManagerList } from './views/TechnicianManagerList/TechnicianManagerList'; 
import JustifyClousure from './views/JustifyClosure/JustifyClousure';
import WorkReportV from './views/WorkReportV/WorkReportV';
import ReportSelectorV from './views/ReportSelectorV/ReportSelectorV';
import SupervisorIncidentCloseV from './views/SupervisorIncidentCloseV/SupervisorIncidentCloseV';
import SupervisorIncidentDetailV from './views/SupervisorIncidenDetailV/SupervisorIncidentDetailV';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
     
   
     
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact />
        <Route path="/Cincident" component={CIncident} exact />
        <Route path="/RolSelector" component={RolSelector} exact/>
        <Route path="/UserIncidentL" component={UserIncidentList} exact/>
        <Route path="/diagnostic" component={CDiagnosis} exact />

        <Route path="/incidentManagerList" component={IncidentList} exact />
        <Route path="/managerDetail" component={DetailIncidentManagerV} exact />

        <Route path="/TechIncidentDetail" component={IncidentTechnicalV} exact />
        <Route path="/TechIncidentsList" component={TechnicalIncidentList} exact />

       
        <Route path="/techAsignL" component={TechnicianManagerList} exact />
        <Route path="/justifyClousure" component={JustifyClousure} exact />
        <Route path="/workReport" component={WorkReportV} exact />
        <Route path="/reportSelector" component={ReportSelectorV} exact />
        <Route path="/SupervisorCloseList" component={SupervisorIncidentCloseV} exact />
        <Route path="/SupervisorIncidentDetail" component={SupervisorIncidentDetailV} exact />

        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>
     
    




      

    </IonReactRouter>
  </IonApp>
);

export default App;
