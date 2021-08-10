/**
 * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ActionTrust} from '#core/constants/action-constants';
import {BaseElement} from './base-element';
import {CSS} from '../../../build/amp-copy-1.0.css';
import {isExperimentOn} from '#experiments';
import {userAssert} from '../../../src/log';

/** @const {string} */
const TAG = 'amp-copy';

/** @extends {PreactBaseElement<CopyDef.CopyApi>} */
class AmpCopy extends BaseElement {
  /** @override */
  init() {
    //this.registerApiAction('copyToClipboard', (api) => api.copyToClipboard());
    this.registerApiAction(
      'copyToClipboard',
      (api, invocation) => {
        const {args} = invocation;
        api.copyToClipboard(args['selector'], args['staticText']);
      },
      ActionTrust.LOW
    );
    //return super.init();
  }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-copy'),
      'expected global "bento" or specific "bento-copy" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpCopy, CSS);
});
