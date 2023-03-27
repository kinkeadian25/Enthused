import React, { useEffect } from 'react';
import NavBar from './NavBar';
import PostsDashboard from '../../features/Posts/dashboard/PostDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {postStore} = useStore();


  useEffect(() => {
    postStore.loadPosts();
  }, [postStore])

  if (postStore.loadingInitial) return <LoadingComponent content=''/>

  return (
    <div className="App">
        <NavBar />
        <PostsDashboard />
    </div>
  );
}

export default observer(App);
