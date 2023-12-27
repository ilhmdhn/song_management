const { Sequelize } = require('sequelize');


module.exports = new Sequelize('ihp_master_song', 'root', '123', {
            host: 'localhost',
            port: 3307,
            logging: (msg) => {
                if (msg.includes('ERROR')) {
                    logger.error(msg);
                }
            },
            dialect: 'mysql',
            dialectOptions: {
                connectTimeout: 3000,
                timezone: '+07:00',
                // ssl: {ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")}
            },
            timezone: '+07:00',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
              },
            // ssl: true
        });
        // return sql;