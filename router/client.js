const {
    getClients,
    getClient,
    createClient,
    updateClient,
    deleteClient
  } = require("../api/data/client");

const getList = async (req, res) => {
    try {
      const data = await getClients(req);
      res.json({
        message:"success",
        data
      });
    } catch (err) {
      console.error('getClients', err);
      res.status(400).send(err.message);
    }
};

const getById = async (req, res) => {
    try {
        const data = await getClient(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('getClient', err);
        res.status(400).send(err.message);
    }
};

const create = async (req, res) => {
    try {
        await createClient(req);
        res.json({
        message: "success"
        });
    } catch (err) {
        console.error('createClient', err);
        res.status(400).send(err);
    } 
};

const update = async (req, res) => {
    try {
        await updateClient(req);
        res.json({
            message: "success"
        });
    } catch (err) {
        console.error('updateClient', err);
        res.status(400).send(err);
    } 
};

const remove = async (req, res) => {
    try {
        const data = await deleteClient(req);
        res.json({
        data
        });
    } catch (err) {
        console.error('deleteClient', err);
        res.status(400).send(err.message);
    }
};

module.exports = {getList , getById, create, update, remove};
