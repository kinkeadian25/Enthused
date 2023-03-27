import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import BlogPost from "../content/BlogPost";
import PostsForm from "../postsform/PostsForm";
import PostList from "./PostList";

export default observer(function PostsDashboard() {
  const { postStore: { selectedPost, editMode } } = useStore();

  return (
    <>
      <PostList />
      {selectedPost ? (!editMode ? <BlogPost /> : <PostsForm />) : null}
    </>
  );
});
