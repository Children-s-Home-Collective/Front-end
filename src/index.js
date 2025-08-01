import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProgrammesPage from './Components/ProgrammesPage';
import VolunteerPage from './Components/VolunteerPage';
import Childrenshomes from './Components/Childrenshomes';
import Account from './Components/Account';
import LoginPage from './Components/LoginPage';
import { Provider } from 'react-redux';
import { store,persistor } from './Components/app/store';
import HomeDetails from './Components/HomeDetails';
import { PersistGate } from 'redux-persist/integration/react';


const router= createBrowserRouter([
  {
    path:"/",
    element:<LoginPage />
  },
  {
    path:"/homepage",
    element:<App />
  },
  {

    path:"/programmes",
    element:<ProgrammesPage />
  },
  {
    path:"/volunteer",
    element:<VolunteerPage />
  },
  {
    path:"/children's homes",
    element:<Childrenshomes />
  },{
    path:"/account",
    element:<Account />
  },
  {
    path:"/homedetails",
    element:<HomeDetails />
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
