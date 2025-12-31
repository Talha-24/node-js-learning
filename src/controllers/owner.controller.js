
import Owner from "../models/owners.schema.js";

//1-Owner (Create)

export const createCarOwner = async (req, res) => {
  const { name, email, phone, cnic } = req.body;
  const owner = await Owner.create({ name, email, phone, cnic });

  return res.json(owner);
};

//2-Owner (Read-All)

export const readAllCarOwners = async (req, res) => {
  // Token Validation

  const all_owners = await Owner.find();
  return res.json({
    success: true,
    message: "Owners are retrieved sucessfully",
    data: all_owners,
  });
};

//3- Owner (Read-On)

export const readSingleOwner = async (req, res) => {
  const id = req.params.id;
  const owner = await Owner.findById(id);
  return res.json({
    success: true,
    message: "Owner is retrieved successfully",
    data: owner,
  });
};

export const deleteOwner = async (req, res) => {
  const id = req.params.id;
  const deleted_owner = await Owner.findByIdAndDelete(id);
  return res.json({
    success: true,
    message: "Owner is deleted successfully",
    data: deleted_owner,
  });
};

// 4-Owner ( Delete-one)

// app.delete("/owners/:id", );

// 5-Owner (Updated-one);

export const updateOwner = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, cnic } = req.body;

  const new_user = await Owner.findByIdAndUpdate(
    id,
    { name, email, phone, cnic },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.json({
    success: true,
    message: "Owner is updated successfully",
    data: new_user,
  });
};
