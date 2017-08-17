import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { KeycloakService } from '../services/keycloak.service';

KeycloakService.init()
.then(() => {
  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
})
.catch((err) => console.error("Error initalizing Keycloak", err));