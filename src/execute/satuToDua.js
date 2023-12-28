const fs = require('fs').promises;
const MasterFileTable = require('../model/master_file');
const MasterLocationTable = require('../model/master_location');
const MasterSongTable = require('../model/master_song');
const MasterExtensionTable = require('../model/master_extension');
const path = require('path');
const moment = require('moment');

const satuToDua = async() =>{
    try {
        const location = await MasterLocationTable.findAll({
            raw: true
        });
        const masterSatuDir = location.find(location => location.id_location == 1);
        const masterDuaDir = location.find(location => location.id_location == 2);


        const files = await fs.readdir(masterSatuDir.location);

        for(let i = 0; i<files.length; i++){
            const [name, extensionFile] = files[i].split('.')
            const checkSong = await MasterSongTable.findOne({
                where:{
                    id: name
                },
                raw: true
            });

            if(!checkSong){
                continue;
            }

            const cekList = await MasterFileTable.findOne({
                where:{
                    id: name
                },
                raw: true
            });

            if(cekList){
                continue;
            }

            const sourceFilePath = path.join(masterSatuDir.location, files[i]);
            const destinationFilePath = path.join(masterDuaDir.location, files[i]);

            console.log(`Menyalin ${sourceFilePath}`);
            await fs.copyFile(sourceFilePath, destinationFilePath);
            console.log(`Menghapus ${sourceFilePath}`);
            await fs.unlink(sourceFilePath);
            const detailFile = await fs.stat(destinationFilePath);
            const formattedDate = moment(detailFile.mtime).format('YYYY-MM-DD HH:mm:ss');
            const dataFile = {
                id_file: name,
                extention: extensionFile,
                date_modified: formattedDate,
                size: detailFile.size,
                location: '2'
            }
            console.log(`INSERT DATA`, JSON.stringify(dataFile));
            await MasterFileTable.create(dataFile)
        }

    } catch (err) {
        console.log(`
        ------ERROR-------
            name: ${err.name}
            message: ${err.message}
            stack: ${err.stack}
        `)
    }
}

satuToDua()