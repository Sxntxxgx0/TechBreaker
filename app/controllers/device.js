import supabase from "../config/index.js";

export const getDevice = async (id) => {
  const { data, error } = await supabase
    .from("Devices")
    .select("*")
    .eq("id", id);

  if (error) return false;

  return data;
};


export const createDevice = async (name) => {
  const { data, error } = await supabase
    .from("Devices")
    .insert([
      {
        name,
      },
    ])
    .select("id");
  
  console.log(data, error);


  if (error) return false;

  return data[0].id;
};
