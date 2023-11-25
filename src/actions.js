import axios from "axios";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";
export const GET_INITIAL_STATE = "GET_INITIAL_STATE";
export function notEkle(not) {
  // ...
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  // ...
  return { type: NOT_SIL, payload: notId };
}
export function fetchLoading() {
  return { type: FETCH_LOADING };
}
export function fetchError() {
  return { type: FETCH_ERROR };
}
export function getInitialState() {
  return { type: GET_INITIAL_STATE };
}
export const notEkleAPI = (yeniNot, notEkleToast) => (dispatch) => {
  dispatch(fetchLoading());
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        dispatch(notEkle(res.data.json));
        notEkleToast(true);
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchError(error));
      notEkleToast(false);
    });
};

export const notSilAPI = (id, notSilToast) => (dispatch) => {
  dispatch(fetchLoading());
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        console.log("sil", res);
        dispatch(notSil(res.data.data));
        notSilToast(true);
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch(fetchError(error));
      notSilToast(false);
    });
};
