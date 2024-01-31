import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { delay, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyService = inject(SpinnerService);

  busyService.busy();

  return next(req).pipe(
    delay(1000),
    finalize(()=>{
      busyService.idle();
    })
  );
};
