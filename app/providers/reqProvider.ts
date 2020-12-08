import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
@Injectable(
    
)
export class ReqProvider {
    public url = 'http://63d837f0d91e.ngrok.io';
    constructor(public http: HttpClient){

    }
    post(action,body,options?){
        return this.http.post(`${this.url}/${action}`,body,options)
    }
    fetch(action,page?,options?){
        return this.http.get(`${this.url}/${action}p=${page ?? 0}`,options)
    }
    fetchOne(action,query){
        return this.http.get(`${this.url}/${action}?q=${query}`)
    }
    updateOne(action,id){
        return this.http.post(`${this.url}/${action}`,{
            '_id' : id
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }
    userFetch(){
        return this.http.get(`${this.url}/userFetch`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

}