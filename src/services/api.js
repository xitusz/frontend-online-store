export async function getCategories() {
  const url = 'https://api.mercadolibre.com/sites/MLB/categories';
  const result = await fetch(url);
  return result.json();
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  const result = await fetch(url);
  return result.json();
}

export async function getProduct(productId) {
  const url = `https://api.mercadolibre.com/items/${productId}`;
  const result = await fetch(url);
  return result.json();
}
