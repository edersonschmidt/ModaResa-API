const {
    getStaffs,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
  } = require("../api/data/staff");

const getList = async (req, res) => {
    try {
      const data = await getStaffs(req);
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
        const data = await getStaff(req);
        res.json({
            data
        });
    } catch (err) {
        console.error('getById', err);
        res.status(400).send(err.message);
    }
};

const create = async (req, res) => {
    try {
        await createStaff(req);
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
        await updateStaff(req);
        res.json({
            message: "success"
        });
    } catch (err) {
        console.error('update', err);
        res.status(400).send(err);
    } 
};

const remove = async (req, res) => {
    try {
        const data = await deleteStaff(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('remove', err);
        res.status(400).send(err.message);
    }
};

module.exports = {getList , getById, create, update, remove};
