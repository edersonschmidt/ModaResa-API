const Router = require("express-promise-router");
const routers = Router();

const staff = require('./staff');
const client = require('./client');
const appointment = require('./appointment');

const nocache = (req, resp, next) => {
  resp.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  resp.header("Expires", "-1");
  resp.header("Pragma", "no-cache");
  next();
};

routers.get("/", nocache, async ({res}) => {
  res.send("Hello World!");
});

routers.get("/staffs", staff.getList);
routers.get("/staffs/:id", staff.getById);
routers.post("/staffs/", staff.create);
routers.patch("/staffs/:id", staff.update);
routers.delete("/staffs/:id", staff.remove);

routers.get("/clients", client.getList);
routers.get("/clients/:id", client.getById);
routers.post("/clients/", client.create);
routers.patch("/clients/:id", client.update);
routers.delete("/clients/:id", client.remove);

routers.get("/appointments", appointment.getList);
routers.get("/appointments/:id", appointment.getById);
routers.get("/appointments/client/:id", appointment.getByClientId);
routers.get("/appointments/staff/:id", appointment.getByStaffId);
routers.patch("/appointments/:id", appointment.update);
routers.post("/appointments/", appointment.create);
routers.delete("/appointments/:id", appointment.remove);

module.exports = routers;
