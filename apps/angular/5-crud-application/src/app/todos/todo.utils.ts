import { assertInInjectionContext, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export function useGlobalErrorHandler() {
  assertInInjectionContext(useGlobalErrorHandler);

  const snackBar = inject(MatSnackBar);

  return (message = 'An error occurred') => {
    snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  };
}
