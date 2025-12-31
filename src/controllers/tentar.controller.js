
import Owner from "../models/owners.schema.js";
import Tenant from "../models/tenants.schema.js";
//1-Owner (Create)

export const createTenant= async (req, res) => {

  const { name, email, phone, cnic } = req.body;

  const owner = await Tenant.create({ name, email, phone, cnic });

  return res.json(owner);
};

//2-Owner (Read-All)

export const readAllTenants = async (req, res) => {
  // Token Validation

  const all_owners = await Tenant.find();

  return res.json({
    success: true,
    message: "Owners are retrieved sucessfully",
    data: all_owners,
  });
};

//3- Owner (Read-On)

export const readSingleTenant = async (req, res) => {
  const id = req.params.id;
  const tenant = await Tenant.findById(id).populate("rented_car");

  const carWithOwner=tenant.rented_car?.owner_id;

  
  
  const owner=await Owner.findById(carWithOwner);

  const array=[];
  array.push(tenant);
  array.push(owner);



  



  return res.json({
    success: true,
    message: "Tenant is retrieved successfully",
    data: array,
  });
};

export const deleteTenant = async (req, res) => {
  const id = req.params.id;
  const deleted_tenant = await Tenant.findByIdAndDelete(id);
  return res.json({
    success: true,
    message: "Tenant is deleted successfully",
    data: deleted_tenant,
  });
};

// 4-Owner ( Delete-one)

// app.delete("/owners/:id", );

// 5-Owner (Updated-one);

export const updateTenant = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone,rented_car } = req.body;

  const new_tanent = await Tenant.findByIdAndUpdate(
    id,
    { name, email, phone,rented_car },
    {
      new: true,
      runValidators: true,
    }
  );


  return res.json({
    success: true,
    message: "Owner is updated successfully",
    data: new_tanent,
  });
};
