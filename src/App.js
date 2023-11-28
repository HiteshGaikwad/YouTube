import './App.css';
import Header from "./components/Header"
import Body from "./components/Body"
import { Provider } from 'react-redux';
import store from "./utils/store"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainContainer from "./components/MainContainer"
import WatchPage from './components/WatchPage';
import Error from "./components/Error"
import { lazy, Suspense } from 'react';
import ShimmerEffect from './components/ShimmerEffect';
import WatchLater from './components/WatchLater';


const Live= lazy(()=>import('./components/Live'));

const approuter= createBrowserRouter([{
  path:"/",
  element:<Body/>,
  errorElement:<Error/>,
  children:[{
    path:"/",
    element:<MainContainer/>
  },{
    path:"watch",
    element:<WatchPage/>
  },
  {
    path:"live",
    element:<Suspense fallback={<ShimmerEffect/>}><Live/></Suspense>
  },
  {
    path:"watchLater",
    element:<WatchLater/>
  }]
}])

function App() {
  return (
    <Provider store={store}>
      <div className='relative'>
      <Header/>
      <RouterProvider router={approuter}/>
      </div>
      </Provider>
  );
}

export default App;
