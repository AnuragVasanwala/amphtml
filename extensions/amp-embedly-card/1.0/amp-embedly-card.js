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

 import {BaseElement} from './amp-embedly-card-impl';
 import {dict} from '#core/types/object';
 import {isExperimentOn} from '#experiments';
 import {userAssert} from '../../../src/log';
 import {AmpEmbedlyKey, TAG as KEY_TAG} from './amp-embedly-key';
 
 /** @const {string} */
 const TAG = 'amp-embedly-card';
 
 class AmpEmbedlyCard extends BaseElement {
   /** @override */
   init() {
     // DO NOT SUBMIT: This is example code only.
     this.registerApiAction('exampleToggle', (api) =>
       api./*OK*/ exampleToggle()
     );
 
     return dict({
       // Extra props passed by wrapper AMP component
       'exampleTagNameProp': this.element.tagName,
     });
   }
 
   /** @override */
   isLayoutSupported(layout) {
     userAssert(
       isExperimentOn(this.win, 'bento') ||
         isExperimentOn(this.win, 'bento-embedly-card'),
       'expected global "bento" or specific "bento-embedly-card" experiment to be enabled'
     );
     return super.isLayoutSupported(layout);
   }
 }
 
 AMP.extension(TAG, '1.0', (AMP) => {
   AMP.registerElement(TAG, AmpEmbedlyCard);
   AMP.registerElement(KEY_TAG, AmpEmbedlyKey);
 });
