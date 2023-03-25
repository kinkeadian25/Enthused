import { action, makeAutoObservable, makeObservable, observable } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";

export default class PostStore {
    posts: Post[] = [];
    selectedPost: Post | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    loadPosts = async () => {
        this.loadingInitial = true;
        try {
            const posts = await agent.Posts.list();
            posts.forEach(post => {
                post.date = post.date.split('T')[0];
                this.posts.push(post);
            });
            this.loadingInitial = false;
        } catch (error) {
            console.log(error);
            this.loadingInitial = false;
        }
    }

}