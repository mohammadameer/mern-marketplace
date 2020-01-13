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
