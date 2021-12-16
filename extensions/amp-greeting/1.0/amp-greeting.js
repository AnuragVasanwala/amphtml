import {BaseElement} from './base-element';
import {CSS} from '../../../build/amp-greeting-1.0.css';
import {dict} from '#core/types/object';
import {isExperimentOn} from '#experiments';
import {userAssert} from '#utils/log';

/** @const {string} */
const TAG = 'amp-greeting';

class AmpGreeting extends BaseElement {
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
        isExperimentOn(this.win, 'bento-greeting'),
      'expected global "bento" or specific "bento-greeting" experiment to be enabled'
    );
    return super.isLayoutSupported(layout);
  }
}

AMP.extension(TAG, '1.0', (AMP) => {
  AMP.registerElement(TAG, AmpGreeting, CSS);
});
