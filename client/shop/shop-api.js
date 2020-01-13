export const create = (params, credentials, shop) => {
  return fetch("/api/shops/by/" + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: shop
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const list = () => {
  return fetch("/api/shops", {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const listByOwner = (params, credentials) => {
  return fetch("/api/shops/by/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const read = params => {
  return fetch("/api/shops/" + params.shopId, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const remove = (params, credentials) => {
  return fetch("/api/shops/" + params.shopId, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};

export const update = (params, credentials, shop) => {
  return fetch(`/api/shops/${params.shopId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${credentials.t}`
    },
    body: shop
  })
    .then(response => response.json())
    .catch(err => console.error(err));
};
