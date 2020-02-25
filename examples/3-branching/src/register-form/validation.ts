export const validateEmail = (v: string) => {
  if (!v) {
    throw Error('Email is required.');
  }

  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(v)) {
    throw Error('Enter a valid email.');
  }
};

export const validateName = (v: string) => {
  if (!v) {
    throw Error('Name is required.');
  }
};

export const validatePassword = (v: string) => {
  if (!v) {
    throw Error('Password is required');
  }

  if (v.length < 4) {
    throw Error('Password must be at least 4 characters');
  }
};
