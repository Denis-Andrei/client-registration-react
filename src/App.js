import './App.scss';
import TopNavComponent from './components/TopNavComponent/TopNavComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NameInput from './components/NameInput/NameInput';
import RegistrationPage from './pages/RegistrationPage';
import BusinessNameInput from './components/BusinessNameInput/BusinessNameInput';
import ContactNrInput from './components/ContactNrInput/ContactNrInput';
import AddressInput from './components/AddressInput/AddressInput';
import BusinessTypeInput from './components/BusinessTypeInput/BusinessTypeInput';
import Password from './components/PasswordInput/PasswordInput';
import Summary from './components/Summary/Summary';
import Success from './components/Success/Success';

function App() {
  return (
      <div style={{WebkitFontSmoothing: "antialiased"}}>
      <TopNavComponent />
      <RegistrationPage>
        <BrowserRouter>
          <Switch>
            <Route  path='/name' component={NameInput} />
            <Route  path='/business-name' component={BusinessNameInput} />
            <Route  path='/contact-number' component={ContactNrInput} />
            <Route  path='/address' component={AddressInput} />
            <Route  path='/business-type' component={BusinessTypeInput} />
            <Route  path='/password' component={Password} />
            <Route  path='/summary' component={Summary} />
            <Route  path='/success' component={Success} />
          </Switch>
        </BrowserRouter>
      </RegistrationPage>
      </div>
      


  );
}

export default App;
