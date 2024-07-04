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
import BinnacleReportV from './views/BinnacleReportV/BinnacleReportV';
import ReportWork2V from './views/ReportWork2V/ReportWork2V';
import AdminSelectorV from './views/AdminSelectorV/AdminSelectorV';
import RegisterUserV from './views/RegisterUserV/RegisterUserV';
import RolAministrationV from './views/RolAministrationV/RolAministrationV';
import UserAdminV from './views/UserAdminV/UserAdminV';
import EditUserV from './views/EditUserV/EditUserV';
import ProtectedRouteWithNavBar from './Auth/SaveRoute';


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <IonReactRouter>
 
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/RolSelector" component={RolSelector} exact />
        <ProtectedRouteWithNavBar path="/UserIncidentL" component={UserIncidentList} exact roles={[2]} />
        <ProtectedRouteWithNavBar path="/Cincident" component={CIncident} exact roles={[2]} />
        <ProtectedRouteWithNavBar path="/incidentManagerList" component={IncidentList} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/reportSelector" component={ReportSelectorV} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/workReport" component={WorkReportV} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/managerDetail" component={DetailIncidentManagerV} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/techAsignL" component={TechnicianManagerList} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/justifyClousure" component={JustifyClousure} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/TechIncidentsList" component={TechnicalIncidentList} exact roles={[4]} />
        <ProtectedRouteWithNavBar path="/TechIncidentDetail" component={IncidentTechnicalV} exact roles={[4]} />
        <ProtectedRouteWithNavBar path="/diagnostic" component={CDiagnosis} exact roles={[4]} />
        <ProtectedRouteWithNavBar path="/SupervisorCloseList" component={SupervisorIncidentCloseV} exact roles={[5]} />
        <ProtectedRouteWithNavBar path="/SupervisorIncidentDetail" component={SupervisorIncidentDetailV} exact roles={[5]} />
        <ProtectedRouteWithNavBar path="/binnacleReport" component={BinnacleReportV} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/workReport2" component={ReportWork2V} exact roles={[3]} />
        <ProtectedRouteWithNavBar path="/adminView" component={AdminSelectorV} exact roles={[1]} />
        <ProtectedRouteWithNavBar path="/registerUserV" component={RegisterUserV} exact roles={[1]} />
        <ProtectedRouteWithNavBar path="/rolAdministration" component={RolAministrationV} exact roles={[1]} />
        <ProtectedRouteWithNavBar path="/usrAdminV" component={UserAdminV} exact roles={[1]} />
        <ProtectedRouteWithNavBar path="/editUsr" component={EditUserV} exact roles={[1]} />
        <Redirect exact from="/" to="/login" />
      </Switch>
  </IonReactRouter>
</IonApp>


);

export default App;
