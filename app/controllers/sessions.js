import supabase from "../config/index.js";

export const getSession = async () => {
  let { data: Sessions, error } = await supabase.from("Sessions").select("*");

  return Sessions;
};

export const getSessionById = async (id) => {
  const { data: Sessions, error } = await supabase
    .from("Sessions")
    .select("*")
    .eq("id", id);

  const res = await supabase.from("Moves").select("*").eq("Session", id);
  const moves = [];

  for (let i = 0; i < res.data.length; i++) {
    let movesI = res.data[i];
    const init = movesI.created_at;

    delete movesI.Session;
    delete movesI.id;
    delete movesI.created_at;
    movesI.init = init;
    moves.push(movesI);
  }

  return { ...Sessions[0], moves };
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

export const updateSession = async (id, phone_n) => {
  const { error, data } = await supabase
    .from("Moves")
    .select("*")
    .eq("Session", id)
    .eq("phone_n", phone_n);

  if (error) return false;

  console.log(error, data);

  if (data.length > 0) {
    console.log("updating");
    const today = new Date().toISOString();

    const { error: e } = await supabase
      .from("Moves")
      .update({ restored: today })
      .eq("Session", id)
      .eq("phone_n", phone_n);

    if (e) return false;
  } else {
    console.log("inserting");
    const { error: e } = await supabase.from("Moves").insert([
      {
        Session: id,
        phone_n: phone_n,
      },
    ]);

    if (e) return false;
  }

  return true;
};

export const finisSession = async (id,time) => {
  // const today = new Date().toISOString();
  const { data, error } = await supabase
    .from("Sessions")
    .update({ isTerminal: true, whenFinish: time})
    .eq("id", id)
    .select();

  if (error) return false;

  return data;
};
