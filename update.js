import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";

const domain = Deno.args[0];
const getLatestHotelApi = domain + Deno.args[1];
const getLatestRsvSumApi = domain + Deno.args[2];

const key = await Deno.readTextFile(Deno.args[3]);
const cert = await Deno.readTextFile(Deno.args[4]);
const client = Deno.createHttpClient({ key, cert });

const opt = {
  client,
  method: "GET",
};

const hotelData = await (await fetch(getLatestHotelApi, opt)).json();
await Deno.writeTextFile("latest_hotel.csv", CSV.stringify(hotelData));

const latestRsvSumData = await (await fetch(getLatestRsvSumApi, opt)).json();
await Deno.writeTextFile("latest_rsv_sum.csv", CSV.stringify(latestRsvSumData));

const backupLatestRsvSumData = latestRsvSumData.filter(d => {
    return d.date_visit >= new Day(TimeZone.JST).toString()
});
await Deno.writeTextFile("data/" + new Day(TimeZone.JST).toString() + ".csv", CSV.stringify(backupLatestRsvSumData));