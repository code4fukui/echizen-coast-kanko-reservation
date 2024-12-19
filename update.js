import { CSV } from "https://js.sabae.cc/CSV.js";
import { Day, TimeZone } from "https://js.sabae.cc/DateTime.js";

const domain = Deno.args[0];
const getLatestHotelApi = domain + Deno.args[1];
const getLatestRsvSumApi = domain + Deno.args[2];

const hotelData = await (await fetch(getLatestHotelApi)).json();
await Deno.writeTextFile("latest_hotel.csv", CSV.stringify(hotelData));

const latestRsvSumData = await (await fetch(getLatestRsvSumApi)).json();
await Deno.writeTextFile("latest_rsv_sum.csv", CSV.stringify(latestRsvSumData));

const backupLatestRsvSumData = latestRsvSumData.filter(d => {
    return d.date_visit >= new Day(TimeZone.JST).toString()
});
await Deno.writeTextFile("data/" + new Day(TimeZone.JST).toString() + ".csv", CSV.stringify(backupLatestRsvSumData));
