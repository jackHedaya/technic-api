const technic_api = require('../');
const assert = require('assert');

describe('Technic API', function () {
    describe('searchPacksSync', function () {
        it('should find 44 results for "hexxit"', function () {
            this.timeout (5000);
            assert.equal(technic_api.searchPacksSync('hexxit').length, 44);
        });
    });

    describe('searchPacks', function () {
        it('should find 44 results for "hexxit"', function () {
            this.timeout (5000);
            technic_api.searchPacks('hexxit', (err, res) => {
                assert.equal(res.length, 44);
                done();
            })
        });
    });
});