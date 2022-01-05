import {text, withKnobs} from '@storybook/addon-knobs';

import * as Preact from '#preact';

import {BentoImageSlider} from '../component';

export default {
  title: 'ImageSlider',
  component: BentoImageSlider,
  decorators: [withKnobs],
};

export const _default = () => {
  const first = text(
    'First image',
    'https://amp.dev/static/samples/img/canoe_900x600.jpg'
  );
  const second = text(
    'Second image',
    'https://amp.dev/static/samples/img/canoe_900x600_blur.jpg'
  );

  return (
    <BentoImageSlider
      initialPosition={0.2}
      firstImageAs={(props) => (
        <img
          src={first}
          alt="A green apple"
          {...props}
          style={{width: 600, height: 300}}
        />
      )}
      firstLabelAs={(props) => <div {...props}>Clear picture</div>}
      secondImageAs={(props) => (
        <img
          src={second}
          alt="A red apple"
          {...props}
          style={{width: 600, height: 300}}
        />
      )}
      secondLabelAs={(props) => <div {...props}>Blur picture</div>}
      leftHintAs={(props) => (
        <div class="label label-left-center" {...props}></div>
      )}
      rightHintAs={(props) => (
        <div class="label label-right-center" {...props}></div>
      )}
      style={{width: 600, height: 300}}
    ></BentoImageSlider>
  );
};
