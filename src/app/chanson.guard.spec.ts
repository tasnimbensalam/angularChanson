import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { chansonGuard } from './chanson.guard';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';

describe('ChansonGuard', () => {
  let guard: chansonGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        chansonGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(chansonGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is admin', () => {
    authService.isAdmin.and.returnValue(true);

    const canActivate = guard.canActivate(null as any, null as any);
    expect(canActivate).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should prevent activation and navigate to app-forbidden if user is not admin', () => {
    authService.isAdmin.and.returnValue(false);

    const canActivate = guard.canActivate(null as any, null as any);
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['app-forbidden']);
  });
});
