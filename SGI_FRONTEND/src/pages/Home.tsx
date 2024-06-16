import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import IncidentList from '../views/IncidentListManager/IncidentList';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
       <IncidentList></IncidentList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
