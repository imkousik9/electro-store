export const defaultAddress = {
  _id: null,
  name: '',
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  phoneNumber: ''
};

export const formReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_NAME': {
      return { ...state, name: payload };
    }
    case 'SET_COUNTRY': {
      return { ...state, country: payload };
    }
    case 'SET_STREET': {
      return { ...state, streetAddress: payload };
    }
    case 'SET_CITY': {
      return { ...state, city: payload };
    }
    case 'SET_STATE': {
      return { ...state, state: payload };
    }
    case 'SET_ZIPCODE': {
      return { ...state, zipCode: payload };
    }
    case 'SET_PHONE_NUMBER': {
      return { ...state, phoneNumber: payload };
    }
    default:
      return state;
  }
};
