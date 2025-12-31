import Car from "../models/cars.schema.js";

export const readAllCars = async (req, res) => {
  const all_cars = await Car.find().populate("owner_id");

  return res.json({
    message: "All cars are retrieved succesfully",
    success: true,
    data: all_cars,
  });
};

export const createCar = async (req, res) => {
  const { model, plate_number, rent_price_per_day, owner_id } = req.body;

  const new_car = await Car.create({
    model,
    plate_number,
    rent_price_per_day,
    owner_id,
  });

  return res.json({
    success: true,
    message: "Car is created successfully",
    data: new_car,
  });
};

export const readSingleCar = async (req, res) => {
  const id = req.params.id;
  const single_car = await Car.findById(id).populate("owner_id");
    return res.json({
    success: true,
    message: "Car is retrieved successfully ",
    data: single_car,
  });
};

// Car (Update-one)

export const updateCar = async (req, res) => {
  const id = req.params.id;
  const { model, owner_id, rent_price_per_day, plate_number } = req.body;
  const updated_car = await Car.findByIdAndUpdate(
    id,
    { model, owner_id, rent_price_per_day, plate_number },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.json({
    success: true,
    message: "Car is updated successfully",
    data: updated_car,
  });
};

// Car (Deleted-one)

export const deleteCar = async (req, res) => {
  const id = req.params.id;
  const deleted_car = await Car.findByIdAndDelete(id);

  return res.json({
    success: true,
    message: "Car is deleted successfully",
    data: deleted_car,
  });
};

