var mongoose       = require('mongoose');
var Schema         = mongoose.Schema;

var PodcastSchema  = new Schema({
    name: String,
    host: String,
    network: String
});

module.exports = mongoose.model('Podcast', PodcastSchema);
