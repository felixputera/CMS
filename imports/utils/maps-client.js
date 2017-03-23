const mapsKey = JSON.parse(Assets.getText("api-key.json")).maps;

export const googleMapsClient = require('@google/maps').createClient({
  key: mapsKey
});