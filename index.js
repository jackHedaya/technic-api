const cheerio = require('cheerio');
const request = require('sync-request');
const fs = require('fs');

exports.searchPacksSync = (packName) => {
    var page = 1;

    var extractPacks = (url, prevPacks) => {
        var req = request('GET', url);

        if (req.statusCode >= 300) {
            var err = new Error(
                'Server responded with status code ' +
                req.statusCode +
                ':\n' +
                req.body.toString(encoding)
            );
            err.statusCode = this.statusCode;
            err.headers = this.headers;
            err.body = this.body;
            throw err;
        }

        var packs = prevPacks;

        const $ = cheerio.load(req.body);

        const pagePacks = $('.modpack-image a img, .modpack-title a')
        pagePacks.map(x => {
            packs.push({
                //    Image                         No Image
                name: pagePacks[x].attribs.title || pagePacks[x].childNodes[0].data,
                site: pagePacks[x].parent.attribs.href || pagePacks[x].attribs.href,
                image: pagePacks[x].attribs["data-cfsrc"] || null
            })
        });

        page++;

        if ($('a[rel="next"]').length > 0) {
            return extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`, packs)
        }
        else {
            return packs;
        }
    }

    return extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`, []);
}

console.log ("Start")
console.log(exports.searchPacksSync('hexxit'))
console.log ("Finish")