module.exports = function (RED) {
    function FastDfsDownNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.tracker = RED.nodes.getNode(config.tracker);
        
        node.on('input', function (msg) {
            let FdfsClient = require('fastdfs-client');
            let fdfs = new FdfsClient({
                trackers: [{
                    host: this.tracker.host,
                    port: this.tracker.port
                }],
                timeout: this.tracker.timeout,
                charset: this.tracker.charset
            });
            let fileId = config.fileid || msg.fileId;
            let fileName = config.filename || msg.fileName;
            fdfs.download(fileId,fileName).then(function () {
                node.send(msg);
            }).catch(function (err) {
                console.error(err);
                node.send(msg);
            });

        });
    }
    RED.nodes.registerType("fastdfs-download", FastDfsDownNode);
}