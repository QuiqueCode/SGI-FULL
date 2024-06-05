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
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './views/LoginView/LoginV';
import CIncident from './views/CreateIncident/CIncidentV';
import CDiagnosis from './views/CreateDiagnosis/CDiagnosis';
import IncidentList from './views/IncidentList/IncidentList';
import { RolSelector } from './views/RolSelector/RolSelectorV';
import { IncidentTechnicalV } from './views/IncidentTechnicalV/IncidentTechnicalV';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
     
   
      
      <IonRouterOutlet>
        <Route path="/login" component={Login} exact />
        <Route path="/Cincident" component={CIncident} exact />
        <Route path="/RolSelector" component={RolSelector} exact/>
        <Route path="/diagnostic" component={CDiagnosis} exact />
        <Route path="/IncidetnTechL" component={IncidentList} exact />
        <Route path="/TechIncidentDetail" component={IncidentTechnicalV} exact />
        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>



      

    </IonReactRouter>
  </IonApp>
);

export default App;
