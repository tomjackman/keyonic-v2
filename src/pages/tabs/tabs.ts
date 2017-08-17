import { Component } from '@angular/core';

import { AccessPage } from '../access/access';
import { AccountPage } from '../account/account';
import { UserPage } from '../user/user';
import { ServerPage } from '../server/server';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UserPage;
  tab2Root = AccessPage;
  tab3Root = ServerPage;
  tab4Root = AccountPage;

  constructor() {

  }
}
