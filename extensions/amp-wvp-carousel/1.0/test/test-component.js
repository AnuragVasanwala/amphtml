import * as Preact from '#preact';
import {BentoWvpCarousel} from '../component';
import {mount} from 'enzyme';

describes.sandboxed('BentoWvpCarousel preact component v1.0', {}, (env) => {
  // DO NOT SUBMIT: This is example code only.
  it('should render', () => {
    const wrapper = mount(<BentoWvpCarousel testProp={true} />);

    const component = wrapper.find(BentoWvpCarousel.name);
    expect(component).to.have.lengthOf(1);
    expect(component.prop('testProp')).to.be.true;
  });
});
