const _ = require("lodash");
const md5 = require("md5");

const db = require("../database");

const TABLE = 'staffs';

const PASS_DEFAULT = 'staff123';

const getStaffs = async () => {
    const sql = `SELECT * FROM ${TABLE}`;
    return await db.all(sql);
};

const getStaff = async (req) => {
    const sql = `SELECT * FROM ${TABLE} WHERE id = ?`;
    const params = req.params.id;
    return await db.get(sql, params);
};

const createStaff = async (req) => {
    await validateFields(req);

    const params = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.password ? md5(req.body.password) : md5(PASS_DEFAULT),
    ];

    const sql = 
        `INSERT INTO ${TABLE} 
            (firstname, lastname, email, password)
        VALUES (?, ?, ?, ?)`;

    return await db.run(sql, params);
}

const updateStaff = async (req) => {
    await validateFields(req);

    const params = [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.params.id,
    ];

    const sql = 
        `UPDATE ${TABLE} SET 
            firstname = COALESCE(?,firstname), 
            lastname = COALESCE(?,lastname), 
            email = COALESCE(?,email)
        WHERE id = ?`;
    
    console.log(params);

    return await db.run(sql, params);
}

const deleteStaff = async (req) => {
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
    if (!req.body?.firstname){
        errors.push("No firstname specified");
    }
    if (!req.body?.lastname){
        errors.push("No lastname specified");
    }

    if (errors.length){
        throw errors;
    }
}

module.exports = { getStaffs, getStaff, createStaff, updateStaff, deleteStaff };
