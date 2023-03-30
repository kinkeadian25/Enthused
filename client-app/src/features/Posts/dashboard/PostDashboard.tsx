import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import PostList from "./PostList";

export default observer(function PostsDashboard() {
  const { postStore} = useStore();
  const {loadPosts, postRegistry} = postStore;

  useEffect(() => {
    if (postRegistry.size <= 1) loadPosts();
  }, [loadPosts, postRegistry.size])

  if (postStore.loadingInitial) return <LoadingComponent content=''/>

  return (
    <>
      <PostList />
    </>
  );
});
