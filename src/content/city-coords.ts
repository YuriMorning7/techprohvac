// Approximate city-center coordinates for the Bay Area cities we serve.
// Used to place project pins on the MapLibre map on the home page.
// Multiple projects in the same city are deterministically jittered so pins
// don't stack exactly on top of each other.
//
// Pattern: [longitude, latitude]

export const CITY_COORDS: Record<string, [number, number]> = {
  "San Mateo": [-122.3255, 37.5629],
  "San Carlos": [-122.2605, 37.5071],
  "Redwood City": [-122.2364, 37.4852],
  "Belmont": [-122.2758, 37.5202],
  "Menlo Park": [-122.1817, 37.4530],
  "Palo Alto": [-122.1430, 37.4419],
  "Burlingame": [-122.3627, 37.5779],
  "Hillsborough": [-122.3566, 37.5602],
  "Foster City": [-122.2711, 37.5585],
  "Millbrae": [-122.3872, 37.5986],
  "Daly City": [-122.4702, 37.6879],
  "Pacifica": [-122.4869, 37.6138],
  "Half Moon Bay": [-122.4286, 37.4636],
  "El Granada": [-122.4697, 37.5021],
  "Moss Beach": [-122.5133, 37.5238],
  "Montara": [-122.5147, 37.5422],
  "San Bruno": [-122.4111, 37.6305],
  "South San Francisco": [-122.4077, 37.6547],
  "Brisbane": [-122.3997, 37.6810],
  "San Francisco": [-122.4194, 37.7749],
  "Santa Clara": [-121.9552, 37.3541],
  "Portola Valley": [-122.2354, 37.3841],
  "Atherton": [-122.1998, 37.4613],
  "Woodside": [-122.2539, 37.4299],
  "Vallejo": [-122.2566, 38.1041],
};

// HQ pin, rendered as a special branded marker.
export const HQ_COORDS: [number, number] = [-122.2592, 37.5021];
