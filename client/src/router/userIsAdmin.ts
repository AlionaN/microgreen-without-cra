import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { Routes, UserRoles } from '@/enums';
import { RootState } from '@/store/reducers';

export const UserIsAdmin = connectedRouterRedirect({
  redirectPath: Routes.Error403,
  authenticatedSelector: (state: RootState) => state.userReducer.isLogIn && localStorage.getItem('role') === UserRoles.admin,
  wrapperDisplayName: 'UserIsAuthenticated'
});
