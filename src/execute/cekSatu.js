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

        const files = await fs.readdir(masterDuaDir.location);
        const tampunganList = await fs.readdir(tampunganDir.location);

        // console.log(`files `+files)
        for(let i = 0; i < files.length; i++){
            const [name, extensionFile] = files[i].split('.')
            const checkSong = await MasterSongTable.findOne({
                where:{
                    id: name
                },
                raw: true
            });
            if(!extensionFile){
                console.log(`ini filenya `+files[i])
                continue;
            }
            const validExtension = await MasterExtensionTable.findOne({
                where:{
                    extension: extensionFile
                },
                raw: true
            });

            if(checkSong){
            }else if(validExtension){

                const fileName = files[i];
                const sourceFilePath = path.join(masterDuaDir.location, fileName);
                const destinationFilePath = path.join(tampunganDir.location, fileName);
                console.log(`id ini tidak ada di master ${fileName}`);
                console.log(`sumber file: ${sourceFilePath}`);

                console.log(`pindah ke file: ${destinationFilePath}`);

                if (tampunganList.includes(files[i])) {
                    console.log(`${files[i]} ditemukan dalam tampungan.`);
                } else {
                    console.log(`${files[i]} tidak ditemukan dalam tampungan.`);
                    await fs.copyFile(sourceFilePath, destinationFilePath);
                    console.log(`berhasil dipindah ${fileName}`);
                }
                
                
                await fs.unlink(sourceFilePath);
                console.log(`berhasil dihapus ${fileName}`);
                // return;
                unknown.push(files[i]);
        }}
        // console.log('tidak diketahui '+ unknown.length)
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