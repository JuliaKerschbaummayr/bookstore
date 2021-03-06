import {Injectable} from '@angular/core';
import {isNullOrUndefined} from "util";
import {HttpClient} from "@angular/common/http";
import * as decode from 'jwt-decode';
import {retry} from 'rxjs/operators';

interface User {
    result: {
        created_at: Date,
        isadmin: boolean,
        email: string,
        id: number,
        name: string,
        updated_at: Date
    }
}

@Injectable()
export class AuthService {

    private api:string = 'http://bookstore19.s1610456015.student.kwmhgb.at/api/auth';//'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string ) {
        return this.http.post(`${this.api}/login`, {'email': email, 'password': password});
    }

    public setCurrentUserId(){
        this.http.get<User>(`${this.api}/user`).pipe(retry(3)).subscribe(res =>{
                localStorage.setItem('userId', res.result.id.toString());
            }
        );
    }

    public getCurrentUserId(){
        return Number.parseInt(localStorage.getItem('userId'));
    }

    public setLocalStorage(token: string) {
        console.log("Storing token");
        console.log(token);
        const decodedToken = decode(token);
        console.log(decodedToken);
        console.log('userid: ' + decodedToken.user.id);
        console.log('isadmin: ' + decodedToken.user.isadmin);
        localStorage.setItem('isadmin', decodedToken.user.isadmin);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', decodedToken.user.id);
    }

    public isAdmin(key) {
        if (localStorage.getItem(key) == "1") {
            return true;
        } else {
            return false;
        }
    }

    logout() {
        this.http.post(`${this.api}/logout`, {});
        localStorage.removeItem("isadmin");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        console.log("logged out");
    }

    public isLoggedIn() {
        if(!isNullOrUndefined(localStorage.getItem("token"))){
            let token : string  = localStorage.getItem("token");
            const decodedToken = decode(token);
            let expirationDate:Date = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            if(expirationDate < new Date()){
                console.log("token expired");
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } else {
            localStorage.removeItem("isadmin");
            localStorage.removeItem("userId");
            return false;
        }
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

}