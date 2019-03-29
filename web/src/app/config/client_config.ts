import { isDevMode } from '@angular/core';

export const enum ServiceFlavor {
  LOCAL,
  PROD
}

export const config = {
  // flavor: ServiceFlavor.LOCAL,
  // flavor: ServiceFlavor.PROD,
  getFlavor: () => (isDevMode() ? ServiceFlavor.LOCAL : ServiceFlavor.PROD)
};
