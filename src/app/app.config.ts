import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Amplify } from 'aws-amplify';

// Configuración de Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_qUgv6PALv',
      userPoolClientId: '4juosm4ct1chm2dqk3b6f7aai9'
    }
  }
});
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptorsFromDi()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};
