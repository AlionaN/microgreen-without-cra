import {
  put,
  call,
  takeEvery,
  all
} from 'redux-saga/effects';
import * as api from '@/api';
import * as actions from '@/store/actions';
import * as types from '@/store/actionTypes';
import { ICategory } from '@/interfaces';
interface IPostCategory {
  type: typeof types.POST_CATEGORY, 
  payload: ICategory
}

interface IDeleteCategory {
  type: typeof types.DELETE_CATEGORY, 
  payload: string
}

interface IEditCategory {
  type: typeof types.EDIT_CATEGORY, 
  id: string, 
  payload: ICategory
}

interface IGetCategory {
  type: typeof types.GET_CATEGORY,
  id: string
}

export function* getCategories() {
  try {
    const response: Response = yield call(api.getCategories);
    yield put(actions.clearGetCategoriesStatus());
    yield put(actions.getCategoriesSuccess(response));
  } catch (error) {
    yield put(actions.getCategoriesFailure(error));
  }
}

export function* getCategory({ type, id }: IGetCategory) {
  try {
    const response: Response = yield api.getCategory(id);
    yield put(actions.clearGetCategoryStatus());
    yield put(actions.getCategorySuccess(response));
  } catch (error) {
    yield put(actions.getCategoryFailure(error));
  }
}

export function* postCategory({ type, payload }: IPostCategory) {
  try {
    yield api.postCategory(payload);

    yield put(actions.postCategorySuccess(payload));
    yield put(actions.clearPostCategoryStatus());
    yield put(actions.getCategories());
  } catch (error) {
    yield put(actions.postCategoryFailure(error));
  }
}

export function* deleteCategory({ type, payload }: IDeleteCategory) {
  try {
    yield api.deleteCategory(payload);

    yield put(actions.deleteCategorySuccess());
    yield put(actions.clearDeleteCategoryStatus());
    yield put(actions.getCategories());
  } catch (error) {
    yield put(actions.deleteCategoryFailure(error));
  }
}

export function* editCategory({ type, id, payload }: IEditCategory) {
  try {
    yield api.editCategory(id, payload);

    yield put(actions.editCategorySuccess());
    yield put(actions.clearEditCategoryStatus());
    yield put(actions.getCategories());
  } catch (error) {
    yield put(actions.editCategoryFailure(error));
  }
}

export default function* categorySaga() {
  yield all([
    takeEvery(types.GET_CATEGORIES, getCategories),
    takeEvery(types.GET_CATEGORY, getCategory),
    takeEvery(types.POST_CATEGORY, postCategory),
    takeEvery(types.DELETE_CATEGORY, deleteCategory),
    takeEvery(types.EDIT_CATEGORY, editCategory),
  ]);
}
