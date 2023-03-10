import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { ChangePassword } from '../models/auth/change-password.model';
import { User } from '../models/auth/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        @Inject(SESSION_STORAGE) private storageService: StorageService) {
        const user = localStorage.getItem("user") || '{}';
        this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(user));
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get user(): User | null {
        return this.currentUserSubject.value;
    }

    public get isAuthenticated(): boolean {
        return this.currentUserSubject?.value?.accessToken != null;
    }

    async login(email: string, password: string): Promise<User> {
        return await firstValueFrom(this.httpClient.post<User>('auth/login', { email, password }))
            .then((user: User) => {
                this.storageService.clear();
                localStorage.setItem('user', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            });
    }

    logout(): void {
        this.storageService.clear();
        localStorage.removeItem('user');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
    }

    async changePassword(changePwd: ChangePassword): Promise<boolean> {
        try {
            await this.httpClient.post<ChangePassword>('auth/change-password', changePwd).toPromise();
            return true;
        } catch (e) {
            return false;
        }
    }
}
