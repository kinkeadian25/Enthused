import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();
  
  return (
    <>
    {location.pathname === '/' ? <HomePage /> : (
      <>
      <NavBar />
        <div className='mx-auto my-8'>
          <Outlet />
        </div>
      </>
    )}
    </>
  );
}

export default observer(App);
