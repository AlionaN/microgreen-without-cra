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

export function* getCategories() {
  try {
    const response: Response = yield call(api.getCategories);
    yield put(actions.clearGetCategoriesStatus());
    yield put(actions.getCategoriesSuccess(response));
  } catch (error) {
    yield put(actions.getCategoriesFailure(error));
  }
}

export function* postCategory({type, payload }: { type: typeof types.POST_CATEGORY, payload: ICategory }) {
  try {
    yield api.postCategory(payload);

    yield put(actions.postCategorySuccess(payload));
    yield put(actions.clearPostCategoryStatus());
    yield put(actions.getCategories());
  } catch (error) {
    yield put(actions.postCategoryFailure(error));
  }
}

export function* deleteCategory({type, payload }: { type: typeof types.DELETE_CATEGORY, payload: string }) {
  try {
    yield api.deleteCategory(payload);

    yield put(actions.deleteCategorySuccess());
    yield put(actions.clearDeleteCategoryStatus());
    yield put(actions.getCategories());
  } catch (error) {
    yield put(actions.deleteCategoryFailure(error));
  }
}

export function* editCategory({type, id, payload }: { type: typeof types.EDIT_CATEGORY, id: string, payload: ICategory }) {
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
    takeEvery(types.POST_CATEGORY, postCategory),
    takeEvery(types.DELETE_CATEGORY, deleteCategory),
    takeEvery(types.EDIT_CATEGORY, editCategory),
  ]);
}
