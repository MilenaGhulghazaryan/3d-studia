import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import iconsReducer from '../features/studia/StudiaSlice';
import subcategoryReducer from '../features/subcategory/SubcategorySlice';
import imagesReducer from '../features/addImg/AddImgSlice'
import arrReducer from '../features/studia/StudiaSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    icons:iconsReducer,
    colorArr:arrReducer,
    subcategory:subcategoryReducer,
    images: imagesReducer
  },
});
