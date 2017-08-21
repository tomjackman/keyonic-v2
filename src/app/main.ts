import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { KeycloakService } from '../services/keycloak.service';

// Ensure that Keycloak is Initialised before Angular to prevent Redirect looping issues
KeycloakService.init()
.then(() => {
  const platform = platformBrowserDynamic();
  // Mnaually intiliase angular
  platform.bootstrapModule(AppModule);
})
.catch((err) => console.error("Error initalizing Keycloak", err));