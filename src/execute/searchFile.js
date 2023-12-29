const fs = require('fs').promises;
const path = require('path');
const MasterLocationTable = require('../model/master_location');
const MasterSongTable = require('../model/master_song');
const MasterFileTable = require('../model/master_file');
const ConfigurationTable = require('../model/configuration');
const moment = require('moment')

const pathDirektori = '\\\\192.168.1.10\\hddext';

const listFiles = async (directoryPath) => {
  try {
    const location = await MasterLocationTable.findAll({
      raw: true
    });
    const masterSatuDir = location.find(location => location.id_location == 1);
    const masterDuaDir = location.find(location => location.id_location == 2);
    const tampunganDir = location.find(location => location.id_location == 3);

    const extensionSupport = ['DAT', 'VOB', 'MPG'];
    const files = await fs.readdir(directoryPath);

    for (let i = 0; i < files.length; i++) {

      const copyProcess = await ConfigurationTable.findOne({
        where:{
          name: 'copy_process'
        },
        raw: true
      });
  
      if(!copyProcess){
        break;
      }
      
      const fileFullPath = path.join(directoryPath, files[i]);

      // Skip temporary files
      if (/^~\$/.test(files[i])) {
        console.log("SKIP " + files[i]);
        continue;
      }

      // Skip certain directories and files
      // if (['System Volume Information', '$RECYCLE.BIN', 'autorun.inf'].includes(files[i])) {
      //   console.log(`SKIP ${files[i]}`);
      //   continue;
      // }

      const detail = await fs.stat(fileFullPath);

      if (detail.isFile()) {
        const [name, extensionFile] = files[i].split('.');

        // Skip unsupported file extensions
        if (!extensionSupport.includes(extensionFile.toUpperCase())) {
          console.log(`SKIP FILE ` + fileFullPath);
          continue;
        }

        const listMasterSong = await MasterSongTable.findOne({
            where:{
                id: name
            },
            raw: true
        });

        if(listMasterSong){

            const checkMasterFile = await MasterFileTable.findOne({
                where:{
                    id_file: name
                    // ,
                    // extention: extensionFile,
                    // date_modified: moment(detail.mtime).format('YYYY-MM-DD HH:mm:ss'),
                    // size: detail.size,
                },
                raw: true
            });

            if(!checkMasterFile){
                console.log('BELUM KEISI\n'+ fileFullPath)
                const insertData = {
                  id_file: name,
                  extention: extensionFile,
                  date_modified: moment(detail.mtime).format('YYYY-MM-DD HH:mm:ss'),
                  size: detail.size,
                  location: '1',
              }
                const destinationFullPath = path.join(masterSatuDir.location, files[i]);
                console.log('MENYALIN '+fileFullPath);
                console.log('TUJUAN '+destinationFullPath);
                await fs.copyFile(fileFullPath, destinationFullPath);
                console.log(`
                INSERT TO DATABASE
                ${JSON.stringify(insertData)}
              `)
              await MasterFileTable.create(insertData)
                console.log('BERHASIL');                
            }
        }

      } else if (detail.isDirectory()) {
        console.log('MASUK DIREKTORI ' + fileFullPath);
        await listFiles(fileFullPath); // Recursive call
      } else {
        console.log(`UNDETEC ${fileFullPath}`);
      }
    }
  } catch (err) {
    console.error(`
      ------ERROR-------
      name: ${err.name}
      message: ${err.message}
      stack: ${err.stack}
    `);
  }
};

// Memanggil fungsi listFiles dengan pathDirektori
listFiles(pathDirektori);
