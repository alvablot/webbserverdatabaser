const model = require("../models/owners.model");

function getOwners(req, res) {
  res.send(model.owners);
}

function getOwner(req, res) {
  const id = req.params.id;
  res.send(model.getOne(id));
}

function postOwner(req, res) {
  const data = req.body;
  res.send(model.addOne(data));
}

function deleteOwner(req, res) {
  const id = req.params.id;
  res.send(model.deleteOne(id));
}

function putOwner(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = model.updateOne(id, data);
  if (result === 404) return res.status(404).json({ error: "Ägare finns ej" });
  res.send(result);
}

function patchOwner(req, res) {
  const id = req.params.id;
  const data = req.body;
  const result = model.patchOne(id, data);
  if (result === 404) return res.status(404).json({ error: "Ägare finns ej" });
  res.send(result);
}

module.exports = {
  getOwners: getOwners,
  getOwner: getOwner,
  postOwner: postOwner,
  deleteOwner: deleteOwner,
  putOwner: putOwner,
  patchOwner: patchOwner,
};
