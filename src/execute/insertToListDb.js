const fs = require('fs').promises;
const MasterFileTable = require('../model/master_file');
const MasterLocationTable = require('../model/master_location');
const MasterSongTable = require('../model/master_song');
const MasterExtensionTable = require('../model/master_extension');
const path = require('path');
const moment = require('moment');

const execute = async() =>{
    try {
        
        const location = await MasterLocationTable.findAll({
            raw: true
        });

        const masterSatuDir = location.find(location => location.id_location == 1);
        const masterDuaDir = location.find(location => location.id_location == 2);
        const tampunganDir = location.find(location => location.id_location == 3);
        const listFile = [];

        const files = await fs.readdir(masterDuaDir.location);

        for(let i = 0; i<files.length; i++){
            
            if(files[i] == 'System Volume Information' || files[i] == '$RECYCLE.BIN'){
                continue;
            }
            
            const [fileName, fileExtension] = files[i].split('.');

            const fileFullPath = path.join(masterDuaDir.location, files[i]);

            const detailFile = await fs.stat(fileFullPath);
            const formattedDate = moment(detailFile.mtime).format('YYYY-MM-DD HH:mm:ss');

            const insertData = {
                id_file: fileName,
                extention: fileExtension,
                date_modified: formattedDate,
                size: detailFile.size,
                location: '2',
            }

            // listFile.push(insertData)
            const isExist = await MasterFileTable.findOne({
                where: insertData,
                raw: true
            })
            if(!isExist){
                console.log(`insert `+JSON.stringify(insertData))
                await MasterFileTable.create(insertData)
            }
            console.log(i)
        }
        console.log('JUMLAH FILE '+listFile.length);
        // await MasterFileTable.bulkCreate(listFile);
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