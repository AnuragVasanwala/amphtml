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
import {EmbedlyCard} from './card';
import {Layout} from '../../../src/layout';
import {PreactBaseElement} from '../../../src/preact/base-element';
import {dict} from '../../../src/core/types/object';
import {getIframe} from '../../../src/3p-frame';
import {isExperimentOn} from '../../../src/experiments';
import {userAssert} from '../../../src/log';

/** @const {string} */
export const TAG = 'amp-embedly-card';

export class AmpEmbedlyCard extends PreactBaseElement {
  /** @override */
  isLayoutSupported(layout) {
    userAssert(
      isExperimentOn(this.win, 'bento') ||
        isExperimentOn(this.win, 'bento-embedly-card'),
      'expected global "bento" or specific "bento-embedly-card" experiment to be enabled'
    );
    return layout == Layout.RESPONSIVE;
  }

  /** @override */
  init() {
    return dict({
      'requestResize': (height) => {
        this.forceChangeHeight(height);
      },
      'getEmbedlyCard': () => {
        const iframe = getIframe(this.win, this.element, 'embedly');
        iframe.title = this.element.title || 'Embedly card';
        return iframe;
      },
    });
  }

  /** @override */
  static getPreconnects() {
    return ['https://cdn.embedly.com'];
  }
}

/** @override */
AmpEmbedlyCard['Component'] = EmbedlyCard;

/** @override */
AmpEmbedlyCard['props'] = {
  'children': {passthroughNonEmpty: true},
  'url': {attr: 'data-url'},
};

/** @override */
AmpEmbedlyCard['layoutSizeDefined'] = true;

/** @override */
AmpEmbedlyCard['usesShadowDom'] = true;

// /**
//  * Copyright 2021 The AMP HTML Authors. All Rights Reserved.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *      http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS-IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// _;

// /** @const {string} */
// const TAG = 'amp-embedly-card';

// class AmpEmbedly extends AmpEmbedlyCard {
//   /** @override */
//   isLayoutSupported(layout) {
//     userAssert(
//       isExperimentOn(this.win, 'bento') ||
//         isExperimentOn(this.win, 'bento-embedly-card'),
//       'expected global "bento" or specific "bento-embedly-card" experiment to be enabled'
//     );
//     return super.isLayoutSupported(layout);
//   }
// }

// import {EmbedlyCard} from './component';
// import {PreactBaseElement} from '../../../src/preact/base-element';

// export class AmpEmbedlyCard extends PreactBaseElement {}

// /** @override */
// AmpEmbedlyCard['Component'] = EmbedlyCard;

// /** @override */
// AmpEmbedlyCard['props'] = {
//   'children': {passthrough: true},
//   // 'children': {passthroughNonEmpty: true},
//   // 'children': {selector: '...'},
// };

// /** @override */
// AmpEmbedlyCard['layoutSizeDefined'] = true;

// /** @override */
// AmpEmbedlyCard['usesShadowDom'] = true;

// // DO NOT SUBMIT: If AmpEmbedlyCard['shadowCss']  is set to `null`, remove the
// // following declaration.
// // Otherwise, keep it when defined to an actual value like `COMPONENT_CSS`.
// // Once addressed, remove this set of comments.
// /** @override */
// AmpEmbedlyCard['shadowCss'] = null;

// /**
//  * @param {!EmbedlyCardDef.Props} props
//  * @return {PreactDef.Renderable}
//  */
//  export function EmbedlyCard({exampleTagNameProp, ...rest}) {
//   // Examples of state and hooks
//   // DO NOT SUBMIT: This is example code only.
//   const [exampleValue, setExampleValue] = useState(0);
//   const exampleRef = useRef(null);
//   useCallback(() => {
//     /* Do things */
//   }, []);
//   useEffect(() => {
//     /* Do things */
//   }, []);
//   useLayoutEffect(() => {
//     /* Do things */
//   }, []);
//   useMemo(() => {
//     /* Do things */
//   }, []);

//   return (
//     <ContainWrapper layout size paint {...rest}>
//       {{exampleTagNameProp}}
//       <div className={'my-classname'}>This is hidden</div>
//     </ContainWrapper>
//   );
// }
