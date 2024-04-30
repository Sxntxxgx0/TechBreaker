import supabase from "../config/index.js";

export const getSession = async (id, active) => {
  let { data: Sessions, error } = await supabase
    .from("Sessions")
    .select("*")
    .eq("device", id)
    .eq("isTerminal", active);
  return Sessions;
};

export const createSession = async (newSession) => {
  const { data, error } = await supabase
    .from("Sessions")
    .insert([
      {
        company: newSession.company,
        device: newSession.device,
        phones: newSession.phones,
        isTerminal: newSession.isTerminal,
      },
    ])
    .select("id");

  if (error) return false;

  return data[0].id;
};

export const finisSession = async (id, time) => {
  const { data, error } = await supabase
    .from("Sessions")
    .update({ isTerminal: true, whenFinish: time })
    .eq("id", id)
    .select();

  console.log(data, error);

  if (error) return false;

  return data;
};
