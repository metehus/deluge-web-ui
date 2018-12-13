class Request{
    constructor(m, p = []){
        this.method = m;
        this.params = p
    }

    get response(){
        return new Promise(resolve => {
            /*$.ajax({
                url: "http://192.168.25.180:8112/json",
                data: JSON.stringify({
                    id: Math.floor(Math.random() * 1000),
                    method: this.method,
                    params: this.params
                }),
                contentType: "application/json",
                dataType: 'json',
                type: 'post',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                success: function(data){
                    resolve(nos);
                }
            });*/

            $.ajax({
                type: 'POST',
                url: '192.168.25.180:8112/json',
                data: JSON.stringify ({
                    id: Math.floor(Math.random() * 1000),
                    method: this.method,
                    params: this.params
                }),
                success: function(data) { console.log(data); },
                contentType: "application/json",
                dataType: 'json'
            });
        });
    }
}