import 'qunit-dom';

import Application from 'dummy/app';
import config from 'dummy/config/environment';
import { start } from 'ember-qunit';

import { setApplication } from '@ember/test-helpers';

// @ts-ignore
setApplication(Application.create(config.APP));

start();
