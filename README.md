# node-read-contrib-fastdfs-client
A node-red node to upload and download file from FastDfs


[![npm](https://img.shields.io/npm/v/node-red-contrib-fastdfs-client/latest.svg?style=flat)](https://www.npmjs.com/package/leogle/node-red-contrib-fastdfs-client) ![downloads](https://img.shields.io/npm/dw/node-red-contrib-fastdfs-client.svg?colorB=009999)

## Installing the node
>#change to your ~./node-red/ folder \
>cd ~/.node-red/ \
>npm install node-red-contrib-fastdfs-client

## fastdfs-download node
download single file from FasfDfs
### input
fileId:FastDfs fileId to download \
fileName: absolute file path to be saved \

### output

## fastdfs-save node
upload
### input
payload:file content \
fileName:absolute file path \
fileExt: File extension

### output
payload: FastDfs fileId