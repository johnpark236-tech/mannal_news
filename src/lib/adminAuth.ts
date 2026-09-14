const ADMIN_KEY = 'mannal_admin_auth';

export function adminLogin(password: string): boolean {
  const correct = import.meta.env.VITE_ADMIN_PASSWORD || 'mannal2026';
  if (password === correct) {
    sessionStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
}

export function adminLogout(): void {
  sessionStorage.removeItem(ADMIN_KEY);
}
