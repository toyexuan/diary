import { isDevMode } from '@angular/core';

export const enum ServiceFlavor {
  LOCAL,
  PROD
}

export const config = {
  // getFlavor: () => ServiceFlavor.LOCAL,
  // getFlavor: () => ServiceFlavor.PROD,
  getFlavor: () => (isDevMode() ? ServiceFlavor.LOCAL : ServiceFlavor.PROD)
};
