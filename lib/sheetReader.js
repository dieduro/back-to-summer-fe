import axios from 'axios';
import Papa from 'papaparse';

export async function read(url) {
    return axios
      .get(url, {
        responseType: "blob",
      })
      .then(
        (response) =>
            new Promise((resolve, reject) => {
                Papa.parse(response.data, {
                    header: true,
                    complete: (results) => resolve(results.data),
                    error: (error) => reject(error.message),
                });
            }),
      ).catch(error => {console.log(error)});
}
