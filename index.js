const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

const packName = "pixelspark";
var page = 1;

const packs = [];

extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`);

function extractPacks (url) {
    request(url, (error, response, html) => {
        if (error) {
            console.log(error);
            return;
        }
    
        const $ = cheerio.load(html);
    
        const pagePacks = $('.modpack-image a img, .modpack-title a')
        pagePacks.map (x => {
            packs.push ({
                //    Image                         No Image
                name: pagePacks[x].attribs.title || pagePacks[x].childNodes[0].data,
                site: pagePacks[x].parent.attribs.href || pagePacks[x].attribs.href,
                image: pagePacks[x].attribs["data-cfsrc"] || null
            })
        });

        const pagePacksT = $('.modpack-title ')
        
        
        page++;
        if ($('a[rel="next"]').length > 0) {
            extractPacks(`https://technicpack.net/modpacks?q=${packName}&page=${page}`)
        }
        else {
            console.log (packs);
        }
    });
}

