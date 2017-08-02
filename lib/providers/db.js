'use strict';

class MongoDatabaseProvider {
    constructor() {
        this.MongoClient = require('mongodb').MongoClient;
        this.init();
    }

    init() {
        var url = 'mongodb://localhost:27017/test';
        MongoClient.connect(url, function(err, db) {
          console.log("Connected correctly to server 'Test'");
          db.close();
        });
    }
};
