const duration1 = "1hr 30min";
const duration2 = "12hr 15min";
const duration3 = "3hr 5min";
const duration4 = "6hr 40min";
const duration5 = "9hr 10min";
const duration6 = "8hr 42min";
const duration7 = "14hr 20min";
const duration8 = "18hr 15min";
const duration9 = "7hr 34min";
const duration10 = "5hr 10min";
const duration11 = "17hr 58min";
const duration12 = "6hr 15min";
const duration13 = "4hr 03min";
const duration14 = "6hr 49min";
const durations = [
  duration1,
  duration2,
  duration3,
  duration4,
  duration5,
  duration6,
  duration7,
  duration8,
  duration9,
  duration10,
  duration11,
  duration12,
  duration13
];

export default function getTime() {
  let num = Math.floor(Math.random() * (13 - 1) + 1);
  let newDuration = durations[num];
  return newDuration;
}
