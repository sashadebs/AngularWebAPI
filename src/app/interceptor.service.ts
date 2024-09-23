import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "./service-token.service";
import { inject, Injectable } from "@angular/core";



@Injectable()
export class InterceptorService implements HttpInterceptor{

    constructor(private serviceToken: TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.serviceToken.getToken();
        if(req.url.includes('/api/Person/token')){
            return next.handle(req);
        }
        const modifiedReq = req.clone({
            headers: req.headers.append("Auth", token)
        });
        return next.handle(modifiedReq);   
    }
    
}
