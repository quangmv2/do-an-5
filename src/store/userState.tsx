import { makeAutoObservable } from 'mobx'

export class UserState {

    id: string | null = null;

    username: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setId(value: string | null) {
        this.id = value;
    }


    setUsername(value: string)  {
        this.username = value;
    }



}
