import { FETCH_ERROR, FETCH_LOADING, NOT_EKLE, NOT_SIL } from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export const reducer = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE:
      return {
        ...state,
        notlar: [...state.notlar, action.payload],
        loading: false,
        error: false,
      };
    case NOT_SIL:
      const remainingNotes = state.notlar.filter(
        (not) => not.id !== action.payload
      );
      return { ...state, notlar: remainingNotes, loading: false, error: false };
    case FETCH_LOADING:
      return { ...state, loading: true, error: false };
    case FETCH_ERROR:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
