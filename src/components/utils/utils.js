export const BASE_URL = "http://127.0.0.1:5555"

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
        if (searchArray[i][searchKey].toString().toLowerCase().includes(searchValue)) {
          updateArray.push(searchArray[i]);
        }
      } else {
        return searchArray;
      }
    }
  }

  return updateArray;
}

export function apiCall(url, method, onSuccessFunction) {
  fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(res => res.json())
    .then(json => {
      if (json.errors) {
        console.log(json.errors);
      }

      onSuccessFunction(json)
    });
}

export function apiCallWithVariables(url, method, data, onSuccessFunction) {
  fetch(url, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
    .then(json => {
      if (json.errors) {
        console.log(json.errors);
      }

      onSuccessFunction(json)
    });
}
