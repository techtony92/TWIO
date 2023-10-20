function useFetch(
  url: string,
  callback: (externalData: any) => void,
  requestOptions?: any
) {
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((externalData) => callback(externalData))
    .catch((error) => {
      console.log(error.message);
    });
}

export default useFetch;
