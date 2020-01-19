import queryString from "query-string";

export const create = (params, credentials, product) => {
  return fetch(`/api/products/by/${params.shopId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${credentials.t}`
    },
    body: product
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const read = params => {
  return fetch(`/api/products/${params.productId}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const update = (params, credentials, product) => {
  return fetch(`/api/product/${params.shopId}/${params.productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${credentials.t}`
    },
    body: product
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const remove = (params, credentials) => {
  return fetch(`/api/product/${params.shopId}/${params.productId}`, {
    method: "DELETE",
    headers: {
      Accept: "applicaiton/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.t}`
    }
  });
};

export const list = params => {
  const query = queryString.stringify(params);
  return fetch(`/api/products?${query}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const listByShop = params => {
  return fetch(`/api/products/by/${params.shopId}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const listLatest = () => {
  return fetch(`/api/products/latest`, {
    method: "GET",
    headers: {
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const listRelated = params => {
  return fetch(`/api/products/related/${params.productId}`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const listCategories = () => {
  return fetch("/api/products/categories", {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};
