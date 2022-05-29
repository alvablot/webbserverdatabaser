function getOwners(req, res){
    res.send(owners);
  }

  function getOwner(req, res){
    const id = req.params.id;
    let owner = ownersDB.find((owner) => owner.id === id);
    const ownerRelation = relationsDB.filter((owner) => owner.ownerId === id);
    let cars = [];
    ownerRelation.forEach((element) => {
      const car = carsDB.find((car) => car.id === element.carId);
      cars.push(car);
    });

    console.log(owner);
    console.log(cars);
  
    const resObj = {
      owner,
      cars,
    };
    res.send(resObj);
  };

  function deleteOwner(req, res){
    const id = req.params.id;
    owners = owners.filter((owner) => owner.id !== id);
  
    res.send(owners);
  };

  function postOwner(req, res){
    const data = req.body;
    owners.push({
      id: uuid.v4(),
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      licence: req.body.licence,
    });
    res.send(owners);
  };

  function putOwner(req, res){
    const id = req.params.id;
    const ownerIndex = owners.findIndex((owner) => owner.id === id);
    console.log(ownerIndex);
    if (ownerIndex < 0) {
      return res.status(404).json({ error: "Ägare finns ej" });
    }
  
    owners[ownerIndex] = {
      id: id,
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      licence: req.body.licence,
    };
    res.json(owners);
  };

  function patchOwner(req, res){
    const id = req.params.id;
    const ownerIndex = owners.findIndex((owner) => owner.id === id);
  
    if (ownerIndex < 0) {
      return res.status(404).json({ error: "Ägare finns ej" });
    }
    console.log(owners[ownerIndex]);
  
    if (req.body.name) {
      owners[ownerIndex].name = req.body.name;
    }
    if (req.body.age) {
      owners[ownerIndex].age = req.body.age;
    }
    if (req.body.email) {
      owners[ownerIndex].email = req.body.email;
    }
    if (req.body.licence) {
      owners[ownerIndex].licence = req.body.licence;
    }
  
    res.json(owners);
  };

  module.exports = {
    getOwners: getOwners,
    getOwner: getOwner,
    deleteOwner: deleteOwner,
    postOwner: postOwner,
    putOwner: putOwner,
    patchOwner: patchOwner,
  }