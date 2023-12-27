const db = require('./sequelize');

const test = async() =>{
    try {
        const dbConfig = db()
        await dbConfig.authenticate();
        console.log('SUCCESS')
    } catch (error) {
        console.log('ERROR', JSON.stringify(error.message));
    }
}

test()