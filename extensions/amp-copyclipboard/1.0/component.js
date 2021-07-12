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
import {ContainWrapper} from '#preact/component';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from '#preact';
import {useStyles} from './component.jss';

/**
 * @param {!CopyclipboardDef.Props} props
 * @return {PreactDef.Renderable}
 */
export function Copyclipboard({exampleTagNameProp, source, ...rest}) {
  // Examples of state and hooks
  // DO NOT SUBMIT: This is example code only.
  const [exampleValue, setExampleValue] = useState(0);
  const exampleRef = useRef(null);
  const styles = useStyles();

  const ele = document.getElementById(source);

  console /*OK*/
    .warn('source');
  console /*OK*/
    .warn(ele);

  useCallback(() => {
    /* Do things */
  }, []);
  useEffect(() => {
    /* Do things */
  }, []);
  useLayoutEffect(() => {
    /* Do things */
  }, []);
  useMemo(() => {
    /* Do things */
  }, []);

  return (
    <ContainWrapper layout size paint {...rest}>
      {exampleTagNameProp}
      <div className={`${styles.exampleContentHidden}`}>This is hidden</div>
    </ContainWrapper>
  );
}
