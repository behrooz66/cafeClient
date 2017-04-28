import { Injectable } from '@angular/core';
import { Settings } from '../settings';

@Injectable()
export class UserService {

  apiBase: string = Settings.apiBase + "restaurant";

  constructor() { }

}
