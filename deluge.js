var main = require('./main.js');

module.exports = {
    login: function(cb){
        main.request("auth.check_session", [], function(data){
            if(data.data.result == false){
                main.request("auth.login", ["deluge"], function(data){

                    cookie = data.res.headers['set-cookie'];

                    cb(cookie)

                });
            }
        });
    },
    connect: function(cookie, cb){
        main.request("web.get_hosts", [], function(data){
            console.log(data.data);
            main.request("web.connect", [data.data.result[0][0]], function(d){
                console.log(d.data);
                cb()
            }, cookie);
        }, cookie);
    },
    getTorrents: function(cookie,callback){
        main.request("web.update_ui", [
            [
                "queue",
                "name",
                "total_size",
                "state",
                "progress",
                "num_seeds",
                "total_seeds",
                "num_peers",
                "total_peers",
                "download_payload_rate",
                "upload_payload_rate",
                "eta",
                "ratio",
                "distributed_copies",
                "is_auto_managed",
                "time_added",
                "tracker_host",
                "save_path",
                "total_done",
                "total_uploaded",
                "max_download_speed",
                "max_upload_speed",
                "seeds_peers_ratio"
            ],
            [

            ]
        ], function(data){
            callback(data)
        }, cookie);
    }
}