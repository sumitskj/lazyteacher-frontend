const apiHeaders = {};
apiHeaders["Content-Type"] = "application/json";

export const fetchBackendApiWrapper = async (path, options, token = "") => {
  if (!options.headers) {
    options.headers = apiHeaders;
  }

  return await fetchRetry(
    `${process.env.NEXT_PUBLIC_BACKEND_API}${path}`,
    options
  );
};

const fetchRetry = async (url, options, retries = 3) => {
  const retryCodes = [408, 500, 502, 503, 504, 522, 524];
  return await fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res;
      }
      if (retries > 0 && retryCodes.includes(res.status)) {
        console.log("Retrying url : ", url, " status: ", res.status);
        setTimeout(() => {
          return fetchRetry(url, options, retries - 1);
        }, 2000);
      } else {
        return res;
      }
    })
    .catch((err) => {
      if (retries > 0) {
        console.log("Retrying url on error : ", url, " err: ", err);
        setTimeout(() => {
          return fetchRetry(url, options, retries - 1);
        }, 2000);
      } else {
        throw err;
      }
    });
};
