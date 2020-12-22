export const validateEmail = ({ value }) => {
  if (!value) {
    throw Error('Email is required.');
  }

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(value)) {
    throw Error('Enter a valid email.');
  }
};

export const validateName = ({ value }) => {
  if (!value) {
    throw Error('Name is required.');
  }
};

export const validatePassword = ({ value }) => {
  if (!value) {
    throw Error('Password is required');
  }

  if (value.length < 4) {
    throw Error('Password must be at least 4 characters');
  }
};
