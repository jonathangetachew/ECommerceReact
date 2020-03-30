import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// Selector to convert collections object to array for rendering on collection preview ( shop page )
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : []
);

// Curried function because selectCollection functions returns createSelector function which we then invoke in the shop component
export const selectCollection = collectionUrlParam =>
  createSelector([selectCollections], collections =>
    collections ? collections[collectionUrlParam] : null
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);

///> Selectro for collection page
export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  shop => !!shop.collections
);