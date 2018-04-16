exports.combineDataWithPromise = (
  data,
  promise,
  dataKey = "data",
  promiseDataKey = "promiseData"
) => {
  return new Promise((resolve, reject) => {
    promise
      .then(promiseData => {
        const re = {};
        re[dataKey] = data;
        re[promiseDataKey] = promiseData;
        resolve(re);
      })
      .catch(err => {});
  });
};
