import { Redirect, Route, Switch } from 'react-router-dom';
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
import { AuthProvider } from './Auth/AuthContext';
import ProtectedRoute from './Auth/SaveRoute';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <Switch>
      <Route path="/login" component={Login} exact />
      <ProtectedRoute path="/RolSelector" component={RolSelector} exact roles={[1, 2, 3, 4, 5]} />
      <ProtectedRoute path="/UserIncidentL" component={UserIncidentList} exact roles={[2]} />
      <ProtectedRoute path="/Cincident" component={CIncident} exact roles={[2]} />
      <ProtectedRoute path="/incidentManagerList" component={IncidentList} exact roles={[3]} />
      <ProtectedRoute path="/reportSelector" component={ReportSelectorV} exact roles={[3]} />
      <ProtectedRoute path="/workReport" component={WorkReportV} exact roles={[3]} />
      <ProtectedRoute path="/managerDetail" component={DetailIncidentManagerV} exact roles={[3]} />
      <ProtectedRoute path="/techAsignL" component={TechnicianManagerList} exact roles={[3]} />
      <ProtectedRoute path="/justifyClousure" component={JustifyClousure} exact roles={[3]} />
      <ProtectedRoute path="/TechIncidentsList" component={TechnicalIncidentList} exact roles={[4]} />
      <ProtectedRoute path="/TechIncidentDetail" component={IncidentTechnicalV} exact roles={[4]} />
      <ProtectedRoute path="/diagnostic" component={CDiagnosis} exact roles={[4]} />
      <ProtectedRoute path="/SupervisorCloseList" component={SupervisorIncidentCloseV} exact roles={[5]} />
      <ProtectedRoute path="/SupervisorIncidentDetail" component={SupervisorIncidentDetailV} exact roles={[5]} />
      <Redirect exact from="/" to="/login" />
    </Switch>
  </IonReactRouter>
</IonApp>
);

export default App;
