export function fetchFilteredProducts({ pagination, sorting, selectFilters }) {
  console.log(pagination);
  console.log(sorting);
  console.log(selectFilters);
  let combinedQueries = { ...pagination, ...sorting, ...selectFilters };
  let queries = "";
  for (let key in combinedQueries) {
    queries += `${key}=${combinedQueries[key]}&`;
  }
  console.log(queries);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/products?${queries}`);
    var header = response.headers.get("X-DOCUMENT-COUNT");
    const data = await response.json();
    resolve({ data: data, totalCount: header });
  });
}

export function fetchProductFilters() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/products/filter`);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
