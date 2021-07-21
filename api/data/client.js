const _ = require("lodash");
const md5 = require("md5");

const db = require("../database");

const TABLE = 'clients';

const PASS_DEFAULT = 'client123';

const getClients = async () => {
    const sql = `SELECT * FROM ${TABLE}`;
    return await db.all(sql);
};

const getClient = async (req) => {
    const sql = `SELECT * FROM ${TABLE} WHERE id = ?`;
    const params = req.params.id;
    return await db.get(sql, params);
};

const createClient = async (req) => {
    await validateFields(req);

    const params = [
        req.body.name,
        req.body.email,
        req.body.password ? md5(req.body.password) : md5(PASS_DEFAULT),
    ];

    const sql = 
        `INSERT INTO ${TABLE} 
            (name, email, password)
        VALUES (?, ?, ?)`;

    return await db.run(sql, params);
}

const updateClient = async (req) => {
    await validateFields(req);

    const params = [
        req.body.name,
        req.body.email,
        req.params.id,
    ];

    const sql = 
    `UPDATE ${TABLE} SET 
        name = COALESCE(?,name), 
        email = COALESCE(?,email)
    WHERE id = ?`;

    return await db.run(sql, params);
}

const deleteClient = async (req) => {
    const sql = `DELETE FROM ${TABLE} WHERE id = ?`;
    const params = req.params.id;
    return await db.run(sql, params);
};

const validateFields = async (req) => {
    const errors = [];

    if (!req.body){
        errors.push("No body specified");
    }

    if (!req.body?.email){
        errors.push("No email specified");
    }
    if (!req.body?.name){
        errors.push("No name specified");
    }

    if (errors.length){
        throw errors;
    }
}

module.exports = { getClients, getClient, createClient, updateClient, deleteClient };
