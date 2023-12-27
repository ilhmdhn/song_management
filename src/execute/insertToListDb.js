const fs = require('fs').promises;
const MasterFileTable = require('../model/master_file');
const MasterLocationTable = require('../model/master_location');
const MasterSongTable = require('../model/master_song');
const MasterExtensionTable = require('../model/master_extension');
const path = require('path');

const execute = async() =>{
    try {
        
        const location = await MasterLocationTable.findAll({
            raw: true
        });

        const masterSatuDir = location.find(location => location.id_location == 1);
        const masterDuaDir = location.find(location => location.id_location == 2);
        const tampunganDir = location.find(location => location.id_location == 3);

        const files = await fs.readdir(masterSatuDir.location);

        for(let i = 0; i<files.length; i++){
            const [fileName, fileExtension] = files[i].split('.');

            const fileFullPath = path.join(masterSatuDir.location, files[i]);

            const detailFile = await fs.stat(fileFullPath);

            const insertData = {
                id_file: fileName,
                extention: fileExtension,
                date_modified: detailFile.mtime,
                size: detailFile.size,
                location: '1',
            }

            console.log(insertData)
        }
    } catch (err) {
        console.log(`
        ------ERROR cekSatu-------
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
    }
}

execute()