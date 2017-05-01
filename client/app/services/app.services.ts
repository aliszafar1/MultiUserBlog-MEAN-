import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import * as fb from 'firebase';
import { Router } from '@angular/router';
import * as Rx from 'rxjs';
import { Subject } from 'rxjs/Rx';
import { FirebaseApp } from 'angularfire2';
import 'rxjs/add/operator/map';
@Injectable()

export class AppService {
    serverURL = 'https://app-bloging.herokuapp.com/';
    // serverURL = 'http://localhost:3000/';
    auth = {
        exist: false,
        uid: '',
        name: '',
        img: '',
        token: ''
    };
    userName;
    userIMG;
    private storage;
    currentUser$: Subject<any>;
    extension;
    fileName;
    fileType;
    file;
    
    text: Object = { msg: "", 'file-name': "", extension: "" };
    allowExtension = {
        "pdf": "pdf",
        "png": "png",
        "zip": "zip",
        "jpg": "jpg",
        "rar": "rar",
        "jpeg": "jpeg"
    }
    constructor(
        @Inject(FirebaseApp) private fbApp: any,
        private http: Http, private router: Router) {
        this.storage = this.fbApp.storage().ref();
        this.currentUser$ = new Subject();
    }
        checkCookie(){
            // return document.cookie;
            return localStorage.getItem("token");
        }

    onSignin(value) {
        return new Promise((res, rej) =>{
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            console.log(value);
            this.http.post( this.serverURL + 'user/signin', JSON.stringify(value), { headers: headers })
                .subscribe(
                data => {
                    data = JSON.parse(data._body);
                    this.auth = {
                        exist: true,
                        uid: data._id,
                        name: data.firstname + ' ' + data.lastname,
                        img: data.url,
                        token: data.token
                    }
                    this.userName = this.auth.name;
                    this.userIMG = this.auth.img;
                    console.log('Auth User ', this.auth);
                    document.cookie = "token="+this.auth.token;
                    localStorage.setItem("token", this.auth.token);
                    localStorage.setItem('authIMG', this.auth.img);
                    localStorage.setItem("authName", this.auth.name);
                    res(this.auth);
                    this.router.navigate(['/']);
                    location.reload();
                },
                err => console.log('Invalid Username or Password', rej(err)),
                () => { console.log('Authentication Complete') }
                    );
        })
    }


    onSignup(value) {
        return new Promise(res => {
            if (this.extension == this.allowExtension[this.extension]) {
                this.uploadFileOnStorageBlob('users/' + this.fileName + '.' + this.fileType, this.file)
                    .then((url) => {
                        value.url = url;
                        console.log('##### Signup #####33', value);
                        var headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        this.http.post(this.serverURL + 'user/signup', JSON.stringify(value), { headers: headers })
                            .subscribe(
                            data => {
                                console.log(data);
                                this.router.navigate(['/signin'])
                                res(data);
                            },
                            err => {
                                console.log(err);
                                res(err)
                            },
                            () => console.log('Singup Complete')
                            );
                    })
            }
        })
    }

    onFileUpload(file, fullPath) {
        this.file = file;
        this.extension = fullPath.replace(/^.*?\.([a-zA-Z0-9]+)$/, "$1");
        var image = fullPath.split("\\")[2];
        this.fileName = image.split('.')[0];
        var originalFileName = this.fileName;
        this.fileName += Date.now();
        this.fileType = image.split('.')[1];
        this.text["file-name"] = originalFileName + "." + this.extension;
        this.text["extension"] = this.extension;
        console.log('##### fileName####3' + this.fileName + '###### fileType ######' + this.fileType + '#### file #######', this.file);
    }

    allPosts() {
        return this.http.get(this.serverURL + 'router/')
            .map((data) => data.json());
    }

    getPostByID(id) {
        return this.http.get( this.serverURL + 'router/' + id)
            .map((data) => data.json());
    }

    postBlog(value) {
        if (this.extension == this.allowExtension[this.extension]) {
            this.uploadFileOnStorageBlob('blogs/' + this.fileName + '.' + this.fileType, this.file)
                .then((url) => {
                    value.url = url;
                    value.authorIMG = localStorage.getItem("authIMG");
                    value.author = localStorage.getItem("authName");
                    console.log('##### blogs #####33', value);
                    var headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    this.http.post( this.serverURL + 'router/', JSON.stringify(value), { headers: headers })
                        .subscribe((res) => {
                        console.log(res)
                        this.router.navigate(['/']);
                    });
                })
        }
    }

    addComment(body, id) {
        let value = {
            comment: body
        }
        console.log('##### body ###3', value);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put( this.serverURL + 'router/comment/' + id, JSON.stringify(value), { headers: headers })
            .subscribe((res) => {
            console.log(res)
            location.reload();
        });
    }

    deleteComment(id, cID) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.put( this.serverURL + 'router/' + id + '/' + cID, { headers: headers })
            .subscribe((res) => {
            console.log(res)
            location.reload();
        });
    }

    replyCmt(body, id, cID) {
        let value = {
            reply: body
        }
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put( this.serverURL +  'router/replyComment/' + id + '/' + cID, JSON.stringify(value), { headers: headers })
        .subscribe((res) => {
            console.log(res)
            location.reload();
        });
    }

    uploadFileOnStorageBlob(path, blob): Promise<string> {
        return new Promise(res => {
            console.log('###### File uploading #######', path);
            this.storage.child(path).put(blob)
                .then((snapshot) => {
                    console.log('Uploaded a blob or file!');
                    res(snapshot.downloadURL);
                    var link = snapshot.downloadURL;
                    console.log(link);
                })
        });
    }
}