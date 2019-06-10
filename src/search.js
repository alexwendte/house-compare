const housesStatic = require('./houses.json');
const fetch = require('node-fetch');
const noFs = require('fs');
const fs = noFs.promises;

const search = async () => {
  const resultsZip = await Promise.all(
    housesStatic.map(house =>
      fetch('https://www.latlong.net/_spm4.php', {
        credentials: 'include',
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9,es;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded',
          pragma: 'no-cache',
          'x-requested-with': 'XMLHttpRequest'
        },
        gzip: true,
        referrer: 'https://www.latlong.net/convert-address-to-lat-long.html',
        referrerPolicy: 'no-referrer-when-downgrade',
        body: `c1=${encodeURIComponent(house.address)}&action=gpcm&cp=`,
        method: 'POST',
        mode: 'cors'
      })
    )
  );
  console.log(resultsZip);
  const results = await Promise.all(resultsZip.map(result => result.text()));
  console.log(results);

  const newHouses = housesStatic.map((house, index) => {
    const [lat, long] = results[index].split(',');
    /* const [lat, long] = [
      '37.694649,-97.122063',
      '37.694420,-97.122772',
      '37.698582,-97.123642',
      '37.699329,-97.121712',
      '37.699581,-97.121712',
      '37.699848,-97.121681',
      '37.699402,-97.122047',
      '37.700119,-97.125778',
      '37.700081,-97.125412',
      '37.700588,-97.123894',
      '37.700550,-97.130150',
      '37.700062,-97.128967',
      '37.700130,-97.131630',
      '37.701141,-97.131706',
      '37.715630,-97.120018'
    ][index].split(','); */
    house.lat = Number(lat);
    house.long = Number(long);
    return house;
  });
  await fs.writeFile('./searchData.json', JSON.stringify(newHouses));
  //   })
  // );
};
search();
