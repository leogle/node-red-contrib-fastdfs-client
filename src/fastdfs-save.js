module.exports = function (RED) {
    //tracker 配置节点
    function TrackerNode(config) {
        RED.nodes.createNode(this, config);
        this.host = config.host;
        this.port = config.port;
        this.timeout = config.timeout;
        this.charset = config.charset;
    }

    function FastDfsSaveNode(config) {
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
                timeout:parseInt(this.tracker.timeout),
                charset: this.tracker.charset
            });
            let fileName = config.filename || msg.fileName || msg.payload
            fdfs.upload(fileName, {
                //     // 上传方法 [upload, uploadAppender, append, modify], 默认为upload
                method: 'upload',
                // 指定文件存储的group，不指定则由tracker server分配
                group: 'group1',
            }).then(function (fileId) {
                msg.payload=fileId;
                node.send(msg);
            }).catch(function (err) {
                console.error(err);
                node.send(msg);
            });

        });
    }
    RED.nodes.registerType("fastdfs-tracker", TrackerNode);
    RED.nodes.registerType("fastdfs-save", FastDfsSaveNode);
}