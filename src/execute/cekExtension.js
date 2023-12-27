const fs = require('fs').promises;
const MasterExtension = require('../model/master_extension');
const MasterLocationTable = require('../model/master_location');

const execute = async() =>{
    try {

        const location = await MasterLocationTable.findAll({
            raw: true
        });
        const masterSatuDir = location.find(location => location.id_location == 1);
        const masterDuaDir = location.find(location => location.id_location == 2);

        const extensionList = [];
        const files = await fs.readdir(masterSatuDir.location);
        const filesTwo = await fs.readdir(masterDuaDir.location);

        files.forEach(element=>{
            const [name, extension] = element.split('.')
            extensionList.push(extension);
        })
        filesTwo.forEach(element=>{
            const [name, extension] = element.split('.')
            extensionList.push(extension)
        })
        const uniqueExtension = new Set(extensionList);

        console.log(uniqueExtension)
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