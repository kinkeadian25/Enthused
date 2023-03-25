import { makeObservable, observable } from "mobx";

export default class PostStore {
    title = 'Hello World';

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}