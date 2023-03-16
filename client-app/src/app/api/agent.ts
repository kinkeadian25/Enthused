import axios, { AxiosResponse } from "axios";
import { Post } from "../models/post";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody),
};

const Posts = {
    list: () => requests.get<Post[]>("/posts"),
    details: (id: string) => requests.get<Post>(`/posts/${id}`),
    create: (post: Post) => requests.post("/posts", post),
    update: (post: Post) => requests.put(`/posts/${post.id}`, post),
    delete: (id: string) => requests.del(`/posts/${id}`)
};

const agent = {
    Posts
};

export default agent;