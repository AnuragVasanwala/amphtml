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

import * as Preact from '#preact';
import {withAmp} from '@ampproject/storybook-addon';
import {withKnobs} from '@storybook/addon-knobs';

export default {
  title: 'amp-copy-1_0',
  decorators: [withKnobs, withAmp],

  parameters: {
    extensions: [{name: 'amp-copy', version: '1.0'}],
    experiments: ['bento'],
  },
};

export const CopyInputValue = () => {
  return (
    <>
      <amp-copy
        id="cp1"
        on="isDisabled:toggleClass(class='disabled', force=true), isEnabled:toggleClass(class='enabled', force=true)"
      />

      <input type="text" id="myInputField1" value="Text to copy!" />
      <input type="text" id="myInputField2" value="My Test" />

      <button on="tap:cp1.copyToClipboard(selector='myInputField1')">
        Copy 1
      </button>
      <button on="tap:cp1.copyToClipboard(selector='myInputField2')">
        Copy 2
      </button>
    </>
  );
};

export const CopyDIVContentText = () => {
  return (
    <>
      <div id="myDiv1">
        <p> hello world </p>
      </div>
      <amp-copy id="cp1" width="100" height="20" source-id="cp1">
        Copy Content
      </amp-copy>
      <button on="tap:cp1.copyToClipboard(selector='myDiv1')">Copy</button>
      <button on="tap:cp1.hide()">Hide</button>
    </>
  );
};
