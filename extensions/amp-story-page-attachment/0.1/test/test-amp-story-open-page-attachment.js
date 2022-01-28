import {AmpDocSingle} from '#service/ampdoc-impl';
import {LocalizationService} from '#service/localization';

import {AmpStoryStoreService} from 'extensions/amp-story/1.0/amp-story-store-service';
import {registerServiceBuilder} from 'src/service-helpers';

import {AmpStoryPageAttachment} from '../amp-story-page-attachment';

describes.realWin(
  'amp-story-page-attachment',
  {amp: true, extensions: ['amp-story-page-attachment:0.1']},
  (env) => {
    let attachmentEl;
    let attachment;
    let outlinkEl;
    let outlink;
    let win;
    let page;
    let storyEl;

    beforeEach(() => {
      win = env.win;

      // Set up the story.
      storyEl = win.document.createElement('amp-story');
      page = win.document.createElement('amp-story-page');
      storyEl.getAmpDoc = () => new AmpDocSingle(win);
      win.document.body.appendChild(storyEl);
      storyEl.appendChild(page);

      const localizationService = new LocalizationService(win.document.body);
      registerServiceBuilder(win, 'localization', function () {
        return localizationService;
      });

      const storeService = new AmpStoryStoreService(win);
      registerServiceBuilder(win, 'story-store', function () {
        return storeService;
      });

      // Set up the attachment element for inline attachment testing.
      attachmentEl = win.document.createElement('amp-story-page-attachment');
      attachmentEl.getAmpDoc = () => new AmpDocSingle(win);
      page.appendChild(attachmentEl);
      attachment = new AmpStoryPageAttachment(attachmentEl);
      env.sandbox.stub(attachment, 'mutateElement').callsFake((fn) => fn());

      // Set up the outlink element for outlink testing.
      outlinkEl = win.document.createElement('amp-story-page-outlink');
      outlinkEl.getAmpDoc = () => new AmpDocSingle(win);
      page.appendChild(outlinkEl);
      outlinkEl.appendChild(win.document.createElement('a'));
      outlink = new AmpStoryPageAttachment(outlinkEl);
      env.sandbox.stub(outlink, 'mutateElement').callsFake((fn) => fn());
    });

    afterEach(() => {
      attachmentEl.remove();
      outlinkEl.remove();
    });

    it('should build the legacy outlinking amp-story-page-attachment UI with target="_top" to navigate in top window. For viewers, this ensures the link will open in the parent window.', async () => {
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('href', 'google.com');
      page.appendChild(attachmentEl);
      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentEl = storyEl.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      expect(openAttachmentEl.getAttribute('target')).to.eql('_top');
    });

    it('should build amp-story-page-outlink UI with target="_top" to navigate in top level browsing context. For viewers, this ensures the link will open in the parent window.', async () => {
      outlinkEl.setAttribute('layout', 'nodisplay');
      const anchorEl = win.document.createElement('a');
      outlinkEl.appendChild(anchorEl);

      outlink.buildCallback();
      outlink.layoutCallback();

      const openAttachmentEl = storyEl.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      expect(openAttachmentEl.getAttribute('target')).to.eql('_top');
    });

    it('should build the open outlink UI with same codepath as page attachment', () => {
      outlinkEl.setAttribute('layout', 'nodisplay');
      outlink.buildCallback();
      outlink.layoutCallback();

      const openoutlinkEl = page.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );
      expect(openoutlinkEl).to.exist;
    });

    it('should build the amp-story-page-attachment UI with one image', () => {
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('cta-image', 'nodisplay');
      page.appendChild(attachmentEl);

      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentEl = page.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      expect(
        openAttachmentEl.querySelector(
          '.i-amphtml-story-inline-page-attachment-img'
        )
      ).to.exist;
    });

    it('should build the amp-story-page-attachment UI with two images', () => {
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('cta-image', 'nodisplay');
      attachmentEl.setAttribute('cta-image-2', 'nodisplay');

      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentEl = page.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      expect(
        openAttachmentEl.querySelectorAll(
          '.i-amphtml-story-inline-page-attachment-img'
        ).length
      ).to.equal(2);
    });

    it('should NOT rewrite the amp-story-page-attachment UI images to a proxy URL', () => {
      const src = 'https://examples.com/foo.bar.png';
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('cta-image', src);

      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentEl = page.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      const imgEl = openAttachmentEl.querySelector(
        '.i-amphtml-story-inline-page-attachment-img'
      );
      expect(imgEl.getAttribute('style')).to.contain(src);
    });

    it('should build the amp-story-page-attachment with href (legacy) UI', () => {
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('href', 'www.google.com');

      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentEl = page.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      expect(
        openAttachmentEl.querySelector(
          '.i-amphtml-story-page-open-attachment-link-icon'
        )
      ).to.exist;
    });

    it('should build the amp-story-page-outlink UI', () => {
      outlinkEl.setAttribute('layout', 'nodisplay');
      const anchorChild = win.document.createElement('a');
      outlinkEl.appendChild(anchorChild);

      outlink.buildCallback();
      outlink.layoutCallback();

      const openAttachmentEl = page.querySelector(
        '.i-amphtml-story-page-open-attachment'
      );

      expect(
        openAttachmentEl.querySelector(
          '.i-amphtml-story-page-open-attachment-link-icon'
        )
      ).to.exist;
    });

    it('should build the open attachment UI with custom text', () => {
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('cta-text', 'Custom text');

      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentLabelEl = page.querySelector(
        '.i-amphtml-story-page-attachment-label'
      );
      expect(openAttachmentLabelEl.textContent).to.equal('Custom text');
    });

    it('should use cta-text attribute when data-cta-text also exist', () => {
      attachmentEl.setAttribute('layout', 'nodisplay');
      attachmentEl.setAttribute('cta-text', 'CTA text');
      attachmentEl.setAttribute('data-cta-text', 'data CTA text');

      attachment.buildCallback();
      attachment.layoutCallback();

      const openAttachmentLabelEl = page.querySelector(
        '.i-amphtml-story-page-attachment-label'
      );

      expect(openAttachmentLabelEl.textContent).to.equal('CTA text');
    });
  }
);
