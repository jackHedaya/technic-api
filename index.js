const cheerio = require('cheerio');
const requestSync = require('sync-request');
const request = require('request');
const fs = require('fs');

exports.searchPacksSync = (packName) => {
    var page = 1;

    var extractPacks = (url, prevPacks) => {
        var req = requestSync('GET', url);

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

        var packs = prevPacks || [];

        const $ = cheerio.load(req.body);

        const pagePacks = $('.modpack-image a, .modpack-title a')

        pagePacks.each(function (index, element) {
            packs.push({
                //    Image                         No Image
                name: $(this).children('img').attr('title') || $(this).text(),
                site: $(this).attr('href'),
                image: $(this).children('img').attr('data-cfsrc') || null
            })
        })




        page++;

        if ($('a[rel="next"]').length > 0) {
            return extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`, packs)
        }
        else {
            return packs;
        }
    }

    return extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`);
}

exports.searchPacks = (packName, callback) => {
    var page = 1;

    var extractPacks = (url, prevPacks) => {
        var req = request(url, (error, response, body) => {
            if (error) {
                callback (error, null);
                return;
            }

            const $ = cheerio.load(body);
            var packs = prevPacks || [];

            const pagePacks = $('.modpack-image a, .modpack-title a')

            pagePacks.each(function () {
                packs.push({
                    //    Image                         No Image
                    name: $(this).children('img').attr('title') || $(this).text(),
                    site: $(this).attr('href'),
                    image: $(this).children('img').attr('data-cfsrc') || null
                })
            })

            page++;

            if ($('a[rel="next"]').length > 0) {
                return extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`, packs)
            }
            else {
                callback (null, packs);
            }
        });
    }

    extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`);
}

console.log("Start")
console.log (exports.searchPacksSync('hexxit').length);
console.log("Finish")