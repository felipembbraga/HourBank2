

const apiKey = '4XXB0A82VQ5V';
const baseUrl = 'http://api.timezonedb.com/?format=json&by=position';

export async function getTime({ latitude, longitude }) {
  let url = `${baseUrl}&key=${apiKey}&lat=${latitude}&lng=${longitude}`;
  try {
    return await fetch(url, {method: 'GET'})
      .then(response => response.json());

  } catch ({error, message}) {
    return {status: 'error'};
  }
}
