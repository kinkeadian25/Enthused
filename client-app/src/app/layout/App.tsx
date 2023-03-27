import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <>
        <NavBar />
        <div className='mx-auto my-8'>
          <Outlet />
        </div>
    </>
  );
}

export default observer(App);
