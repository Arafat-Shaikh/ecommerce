export function fetchFilteredProducts({ pagination, sorting, selectFilters }) {
  let combinedQueries = { ...pagination, ...sorting, ...selectFilters };
  let queries = "";
  for (let key in combinedQueries) {
    queries += `${key}=${combinedQueries[key]}&`;
  }
  console.log(queries);

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products?${queries}`);
    var header = response.headers.get("X-DOCUMENT-COUNT");
    const data = await response.json();
    resolve({ data: data, totalCount: header });
  });
}

export function fetchProductFilters() {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products/filter`);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchProductById(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`/products/detail/${id}`);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}
