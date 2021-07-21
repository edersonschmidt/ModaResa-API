const _ = require("lodash");

const db = require("../database");

const TABLE = 'appointments';

const getAppointments = async () => {
    const sql = `SELECT * FROM ${TABLE}`;
    return await db.all(sql);
};

const getAppointment = async (req) => {
    const sql = `SELECT * FROM ${TABLE} WHERE id = ?`;
    const params = req.params.id;
    return await db.get(sql, params);
};

const getAppointmentByClient = async (req) => {
    const sql = `SELECT * FROM ${TABLE} WHERE clientId = ?`;
    const params = req.params.id;
    return await db.get(sql, params);
};

const getAppointmentByStaff = async (req) => {
    const sql = `SELECT * FROM ${TABLE} WHERE staffId = ?`;
    const params = req.params.id;
    return await db.get(sql, params);
};

const createAppointment = async (req) => {
    await validateFields(req);

    const params = [
        req.body.startTime,
        req.body.endTime,
        req.body.clientId,
        req.body.staffId,
        req.body.subject,
        req.body.description,
    ];

    const sql = 
        `INSERT INTO ${TABLE} 
            (startTime, endTime, clientId, staffId, subject, description)
        VALUES (?, ?, ?, ?, ?, ?)`;

    return await db.run(sql, params);
}


const updateAppointment = async (req) => {
    await validateFields(req);

    const params = [
        req.body.startTime,
        req.body.endTime,
        req.body.clientId,
        req.body.staffId,
        req.body.subject,
        req.body.description,
        req.params.id,
    ];

    const sql = 
    `UPDATE ${TABLE} SET 
        startTime = COALESCE(?,startTime),
        endTime = COALESCE(?,endTime),
        clientId = COALESCE(?,clientId),
        staffId = COALESCE(?,staffId),
        subject = COALESCE(?,subject),
        description = COALESCE(?,description)
    WHERE id = ?`;

    return await db.run(sql, params);
}

const deleteAppointment = async (req) => {
    const sql = `DELETE FROM ${TABLE} WHERE id = ?`;
    const params = req.params.id;
    return await db.run(sql, params);
};

const validateFields = async (req) => {
    const errors = [];

    if (!req.body){
        errors.push("No body specified");
    }

    if (!req.body.startTime){
        errors.push("No startTime specified");
    }

     if (!req.body.endTime){
        errors.push("No endTime specified");
    }

    if (!req.body.clientId){
        errors.push("No clientId specified");
    }

    if (!req.body.staffId){
        errors.push("No staffId specified");
    }

    if (!req.body.subject){
        errors.push("No subject specified");
    }

    if (errors.length){
        throw errors;
    }
}

module.exports = {
    getAppointments,
    getAppointment,
    getAppointmentByClient,
    getAppointmentByStaff,
    updateAppointment,
    createAppointment,
    deleteAppointment
};
