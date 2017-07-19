import _ from 'lodash';
import {expect} from 'chai';

import indexHTML from '../../../src/common/utilities/indexHtml';

describe('Function index html', () => {

  it('should show version', () => {
    const version = '1.0.0';
    const result = indexHTML({version});

    expect(_.includes(result, `<!-- ${version} -->`)).to.equal(true);
  });

  it('should show body', () => {
    const body = 'Hello World!';
    const result = indexHTML({body});

    expect(_.includes(result, `<div id="root">${body}</div>`)).to.equal(true);
  });

  it('should format links', () => {
    const appLink = '/vendorLink';
    const vendorLink = '/vendorLink';
    const result = indexHTML({appLink, vendorLink});

    expect(_.includes(result, `<script src="${vendorLink}"></script>`)).to.equal(true);
    expect(_.includes(result, `<script src="${appLink}"></script>`)).to.equal(true);
  });

  it('should parse and apply state', () => {
    const state = {count: 10};
    const stringifiedState = JSON.stringify(state);
    const result = indexHTML({state});

    expect(_.includes(result, `<script>window.__INITIAL_STATE__ = ${stringifiedState}</script>`)).to.equal(true);
  });

  it('should apply manifest', () => {
    const manifest = {count: 10};
    const result = indexHTML({manifest});

    expect(_.includes(result, `<script>${manifest}</script>`)).to.equal(true);
  });

});
