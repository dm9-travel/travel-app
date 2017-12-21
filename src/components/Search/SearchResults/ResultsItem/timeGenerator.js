const time1 = "04:45:00";
const time2 = "12:30:00";
const time3 = "10:15:00";
const time4 = "11:00:00";
const time5 = "02:10:00";
const time6 = "09:05:00";
const time7 = "07:30:00";
const time8 = "08:35:00";
const time9 = "06:05:00";
const time10 = "07:15:00";
const time11 = "09:25:00";
const time12 = "12:00:00";
const time13 = "05:50:00";
const times = [
  time1,
  time2,
  time3,
  time4,
  time5,
  time6,
  time7,
  time8,
  time9,
  time10,
  time11,
  time12,
  time13
];

export default function getTime() {
  let num = Math.floor(Math.random() * (13 - 1) + 1);
  let newTime = times[num];
  return newTime;
}
