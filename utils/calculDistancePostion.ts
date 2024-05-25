import * as turf from "@turf/turf"

export default function calculDistancePosition(from: { latitude: number, longitude: number }, to: { latitude: number, longitude: number }) {
    var _from = turf.point([from.longitude, from.latitude])
    var _to = turf.point([to.longitude, to.latitude])
    var options = { units: "kilometers" }
    var distance = turf.distance(_from, _to, options)

    return distance;
}