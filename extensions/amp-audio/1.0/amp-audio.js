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

import {BaseElement} from './base-element';
import {closestAncestorElementBySelector} from '#core/dom/query';
import {dict} from '#core/types/object';
import {isExperimentOn} from '#experiments';
import {Layout} from '#core/dom/layout';
import {propagateAttributes} from '#core/dom/propagate-attributes';
import {user, userAssert} from '../../../src/log';
import {validateMediaMetadata} from '../../../src/mediasession-helper';

/** @const {string} */
const TAG = 'amp-audio';

/**
 * Visible for testing only.
 */
export class AmpAudio extends BaseElement {
  /** @override */
  init() {
    this.registerApiAction('play', (api) => api./*OK*/ play());
    this.registerApiAction('pause', (api) => api./*OK*/ pause());
    this.registerApiAction('isPlaying', (api) => api./*OK*/ isPlaying());

    // Actions won't work with `<amp-story>` element
    if (closestAncestorElementBySelector(this.element, 'AMP-STORY')) {
      user().warn(
        TAG,
        '<amp-story> elements do not support actions on ' +
          '<amp-audio> elements'
      );
    }

    return dict({
      'validateMediaMetadata': (element, metaData) => {
        validateMediaMetadata(element, metaData);
      },
      'onLoad': () => {
        this.toggleFallback(false);
      },
      'onError': () => {
        this.toggleFallback(true);
      },
      'propagateAttributes': (
        attributes,
        updateElement,
        opt_removeMissingAttrs
      ) => {
        propagateAttributes(
          attributes,
          this.element,
          updateElement,
          opt_removeMissingAttrs
        );
      },
    });
  }

  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-audio'),
      'expected global "bento" or specific "bento-audio" experiment to be enabled'
    );
    //return super.isLayoutSupported(layout);
    return layout == Layout.FIXED || layout == Layout.FIXED_HEIGHT;
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpAudio);
});
