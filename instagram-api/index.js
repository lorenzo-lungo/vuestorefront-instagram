import { apiStatus } from '../../../lib/util';
import { Router } from 'express';
const request = require('request')
const Magento2Client = require('magento2-rest-client').Magento2Client

module.exports = ({ config, db }) => {
    let instagramApi = Router();

    instagramApi.get('/instagramFeed', (req, res) => {
        const fs = require('fs');
        const rimraf = require('rimraf')
        var d = new Date();
        var hours = d.getHours();

        fs.stat('/tmp/instagram/' + hours + '.json', function (err, stats) {
            if (stats) {
                var result = JSON.parse(fs.readFileSync('/tmp/instagram/' + hours + '.json', "utf8"))
                apiStatus(res, result, 200);
            } else {
                const client = Magento2Client(config.magento2.api);
                client.addMethods('showFeed', function (restClient) {
                    let module = {};
                    module.createFeed = function (requestBody) {
                        var util = require('util');
                        var endpointUrl = util.format('/apiQuerySingleLike/value/core_config_data/path/access_token');
                        return restClient.get(endpointUrl);
                    }
                    return module;
                })

                var finalResponse = ''

                client.showFeed.createFeed().then((result) => {
                    var token = result[0].value
                    return request({
                        url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + token,
                        method: 'GET',
                        json: true,
                    }, function (error, response, body) {
                        if (error) {
                            console.error(error)
                            apiStatus(res, 'An error occured while accessing Instagram', 500)
                        } else {
                            finalResponse = body.data
                            apiStatus(res, body.data, 200);
                        }
                    })

                    // just dump it to the browser, result = JSON object


                }).catch(err => {
                    apiStatus(res, err, 500);
                })

                rimraf('/tmp/instagram/*', function () {
                    console.log('instagram dir cleaned');
                });
                setTimeout(function () {
                    fs.writeFileSync('/tmp/instagram/' + hours + '.json', JSON.stringify(finalResponse), "utf8")
                }, 2000);

            }
        })
    })
    return instagramApi
}
