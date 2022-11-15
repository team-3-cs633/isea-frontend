/**
 * Function to be used as a prop from a parent component utilizing the SearchBar.
 *
 * Note: Errors in the searching parameters will return the original array
 *
 * @param {*} searchArray the array containing data to sub-select from
 * @param {*} data the search data containing the key value pair for searching
 * @returns an array with search results based on the input data
 */
export function handleUpdateOnSearch(searchArray, data) {
  let updateArray = [];
  let searchData = data.split(":");

  if (searchData.length !== 2) {
    return searchArray;
  } else {
    let searchKey = searchData[0].trim();
    let searchValue = searchData[1].trim().toLowerCase();

    for (let i = 0; i < searchArray.length; i++) {
      if (searchArray[i][searchKey]) {
        if (
          searchArray[i][searchKey]
            .toString()
            .toLowerCase()
            .includes(searchValue)
        ) {
          updateArray.push(searchArray[i]);
        }
      } else {
        return searchArray;
      }
    }
  }

  return updateArray;
}

/**
 * Make an API call with no variables, and with a callabck function.
 *
 * @param {*} url the url to make a request to
 * @param {*} method the request method (POST, GET, DELETE, etc.)
 * @param {*} onSuccessFunction the callback function use to handle the response data
 * @returns the http response as a Promise
 */
export function apiCall(url, method, onSuccessFunction) {
  let result = fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        console.log(json.error);
      }

      onSuccessFunction(json);
      return json;
    });

  return result;
}

/**
 * Make an API call with input variables, and with a callabck function.
 *
 * @param {*} url the url to make a request to
 * @param {*} method the request method (POST, GET, DELETE, etc.)
 * @param {*} data the input data as json required for the request
 * @param {*} onSuccessFunction the callback function use to handle the response data
 */
export function apiCallWithVariables(url, method, data, onSuccessFunction) {
  fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        console.log(json.error);
      }

      onSuccessFunction(json);
    });
}

/**
 * A human readable date from an epoch ms timestamp.
 *
 * @param {*} epoch a timestamp in epoch ms
 * @returns a human readable date in MM/DD/YY format
 */
export function readableDate(epoch) {
  let date = new Date(parseInt(epoch)).toLocaleDateString();
  return date;
}

/**
 * A human readable time from an epoch ms timestamp.
 *
 * @param {*} epoch a timestamp in epoch ms
 * @returns a human readble time in HH:MM:SS AM||PM
 */
export function readableTime(epoch) {
  let time = new Date(parseInt(epoch)).toLocaleTimeString();
  return time;
}
