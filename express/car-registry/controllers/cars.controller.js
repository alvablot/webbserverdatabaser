function getCars(req, res){
    res.send(cars);
  };
  
  function getCar(req, res) {
    const id = req.params.id;
    cars = cars.filter((car) => car.id === id);
    console.log(id);
    res.send(cars);
  };
  
  function deleteCar(req, res) {
    const id = req.params.id;
    cars = cars.filter((car) => car.id !== id);
  
    res.send(cars);
  };
  
  function postCar(req, res) {
    if (!req.body.reg) {
      res.status(400).json({ error: "Inget regnummer" });
      return;
    }
    if (req.body.reg.length !== 6) {
      res.status(400).json({ error: "Felaktigt regnummer" });
      return;
    }
    cars.push({
      id: uuid.v4(),
      brand: req.body.brand,
      model: req.body.model,
      reg: req.body.reg,
    });
    res.send(cars);
  };
  
  function putCar(req, res) {
    const id = req.params.id;
    const carIndex = cars.findIndex((car) => car.id === id);
    console.log(carIndex);
    if (carIndex < 0) {
      return res.status(404).json({ error: "Bilen finns ej" });
    }
  
    const originalCar = cars[carIndex];
    cars[carIndex] = {
      id: id,
      brand: req.body.brand,
      model: req.body.model,
      reg: req.body.reg,
    };
  
    res.json(cars);
  };
  
  function patchCar(req, res) {
    const id = req.params.id;
    const carIndex = cars.findIndex((car) => car.id === id);
  
    if (carIndex < 0) {
      return res.status(404).json({ error: "Bil finns ej" });
    }
    console.log(cars[carIndex]);
  
    if (req.body.reg) {
      cars[carIndex].reg = req.body.reg;
    }
    if (req.body.brand) {
      cars[carIndex].brand = req.body.brand;
    }
    if (req.body.model) {
      cars[carIndex].model = req.body.model;
    }
    res.json(cars);
  };

  module.exports = {
    getCars: getCars,
    getCar: getCar,
    deleteCar: deleteCar,
    postCar: postCar,
    putCar: putCar,
    patchCar: patchCar,
  }