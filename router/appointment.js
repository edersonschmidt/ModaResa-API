const {
    getAppointments,
    getAppointment,
    getAppointmentByClient,
    getAppointmentByStaff,
    updateAppointment,
    createAppointment,
    deleteAppointment
  } = require("../api/data/appointment");

const getList = async (req, res) => {
    try {
      const data = await getAppointments(req);
      res.json({
        message:"success",
        data
      });
    } catch (err) {
      console.error('getList', err);
      res.status(400).send(err.message);
    }
};

const getById = async (req, res) => {
    try {
        const data = await getAppointment(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('getById', err);
        res.status(400).send(err.message);
    }
};

const getByClientId = async (req, res) => {
    try {
        const data = await getAppointmentByClient(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('getByClientId', err);
        res.status(400).send(err.message);
    }
};

const getByStaffId = async (req, res) => {
    try {
        const data = await getAppointmentByStaff(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('getByStaffId', err);
        res.status(400).send(err.message);
    }
};

const create = async (req, res) => {
    try {
        await createAppointment(req);
        res.json({
        message: "success"
        });
    } catch (err) {
        console.error('create', err);
        res.status(400).send(err);
    } 
};

const update = async (req, res) => {
    try {
        await updateAppointment(req);
        res.json({
            message: "success"
        });
    } catch (err) {
        console.error('updateAppointment', err);
        res.status(400).send(err);
    } 
};

const remove = async (req, res) => {
    try {
        const data = await deleteAppointment(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('remove', err);
        res.status(400).send(err.message);
    }
};

module.exports = {
    getList,
    getById,
    getByClientId,
    getByStaffId,
    create,
    update,
    remove
};
