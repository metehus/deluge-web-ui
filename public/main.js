$(document).ready(function () { 
    var torrents;
    socket.on('setup', msg => {
        torrents = Object.keys(msg.result.torrents).length;
        table = document.querySelector('#torrents')
        table.innerHTML = '';
        var torrents, tmptd, tmptr;
        for (let i = 0; i < Object.keys(msg.result.torrents).length; i++) {
            var torrent = msg.result.torrents[Object.keys(msg.result.torrents)[i]];

            freshUpdate(Object.keys(msg.result.torrents)[i], torrent.state, torrent.name, humanFileSize(torrent.total_size), torrent.progress.toFixed(1), humanFileSize(torrent.download_payload_rate),humanFileSize(torrent.upload_payload_rate),torrent.eta)
            
        }
        console.info('setup')
        console.log(msg)
    });

    socket.on('status', msg => {

        torrentList = Object.keys(msg.result.torrents);
        for (let i = 0; i < torrentList.length; i++) {
            const t = torrentList[i];
            $('#name-'+torrentList[i]).text(msg.result.torrents[t].name);
            $('#percent-'+torrentList[i]).text(msg.result.torrents[t].progress.toFixed(1)+"%");
            $('#down-'+torrentList[i]).html(`${humanFileSize(msg.result.torrents[t].download_payload_rate)}<i class="material-icons">
            arrow_downward
            </i>`);
            $('#up-'+torrentList[i]).html(`${humanFileSize(msg.result.torrents[t].upload_payload_rate)}<i class="material-icons">
            arrow_upward
            </i>`);
            $('#time-'+torrentList[i]).text(moment.preciseDiff(0, msg.result.torrents[t].eta*1000));
            //console.log(msg.result.torrents[t].eta)
        }

        if (torrents < torrentList.length) {
            torrents++
            console.log(torrents)
        }
    });
});
/*
table = document.querySelector('#torrents')
        table.innerHTML = '';
        var torrents, tmptd, tmptr;
        for (let i = 0; i < Object.keys(msg.result.torrents).length; i++) {
            var torrent = msg.result.torrents[Object.keys(msg.result.torrents)[i]];

            freshUpdate(torrent.state, torrent.name, humanFileSize(torrent.total_size), torrent.progress.toFixed(1), humanFileSize(torrent.download_payload_rate),humanFileSize(torrent.upload_payload_rate),torrent.eta)
            
        }
        console.info('setup')
        console.log(msg)
*/
function freshUpdate(id, state, name, size, percent, down, up, time) {
	var listContainer = document.getElementById('torrents');
	var tmptr;
	var tmptd;
	var tmplabel;
	var tmpinput;
	var tmptd2;
    var tmptd3;
    var stateIcon;
    
    switch (state) {
        case 'Paused':
            stateIcon = 'pause'
            break;

        case 'Downloading':
            stateIcon = 'play_arrow'
            break;
    
        default:
            stateIcon = 'close'
            break;
    }
    
    tmptr = document.createElement("tr");
	tmptd = document.createElement("td");
	tmptd.setAttribute("class", "mdl-data-table__cell--non-numeric checkboxtable");
	tmplabel = document.createElement("label");
	tmplabel.setAttribute("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select ckbox");
	tmpinput = document.createElement("input");
	tmpinput.setAttribute("class", "mdl-checkbox__input");
	tmpinput.setAttribute("type", "checkbox");
    tmptd1 = document.createElement("td");
    tmptd1.setAttribute("class", "mdl-data-table__cell--non-numeric state");
	tmptd1.innerHTML = `<i class="material-icons">
    ${stateIcon}
    </i>`;
    tmptd1.setAttribute("id", 'state-'+id)
    tmptd2 = document.createElement("td");
    tmptd2.setAttribute("class", "mdl-data-table__cell--non-numeric");
    tmptd2.innerHTML = name;
    tmptd2.setAttribute("id", 'name-'+id)
	tmptd3 = document.createElement("td");
    tmptd3.innerHTML = size;
    tmptd3.setAttribute("id", 'size-'+id)
    tmptd4 = document.createElement("td");
	tmptd4.setAttribute("class", "");
    tmptd4.innerHTML = percent+"%";
    tmptd4.setAttribute("id", 'percent-'+id)
    tmptd5 = document.createElement("td");
	tmptd5.setAttribute("class", "");
    tmptd5.innerHTML = `${down}<i class="material-icons">
    arrow_downward
    </i>`;
    tmptd5.setAttribute("id", 'down-'+id)
    tmptd6 = document.createElement("td");
    tmptd6.innerHTML = `${up}<i class="material-icons">
    arrow_upward
    </i>`;
    tmptd6.setAttribute("id", 'up-'+id)
    tmptd7 = document.createElement("td");
	tmptd7.setAttribute("class", "mdl-data-table__cell--non-numeric");
    tmptd7.innerHTML = time;
    tmptd7.setAttribute("id", 'time-'+id)
	// connect new Elements into the "tr row" element
	tmplabel.appendChild(tmpinput);
	tmptd.appendChild(tmplabel);
    tmptr.appendChild(tmptd);
    tmptr.appendChild(tmptd1);
	tmptr.appendChild(tmptd2);
    tmptr.appendChild(tmptd3);
    tmptr.appendChild(tmptd4);
    tmptr.appendChild(tmptd5);
    tmptr.appendChild(tmptd6);
    tmptr.appendChild(tmptd7);
	// MDL promotions that re-attach events and styles
	componentHandler.upgradeElement(tmpinput);
	componentHandler.upgradeElement(tmplabel);
	componentHandler.upgradeElement(tmptd);
    componentHandler.upgradeElement(tmptd1);
    componentHandler.upgradeElement(tmptd2);
    componentHandler.upgradeElement(tmptd3);
    componentHandler.upgradeElement(tmptd4);
    componentHandler.upgradeElement(tmptd5);
    componentHandler.upgradeElement(tmptd6);
    componentHandler.upgradeElement(tmptd7);
	// Insert new elements into the DOM
	listContainer.appendChild(tmptr);
}

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    var units = si
        ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
        : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1)+' '+units[u];
}