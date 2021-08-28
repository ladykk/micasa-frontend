const signInForm = (form) => {
  const signInForm = new FormData();
  signInForm.append("username", form.username);
  signInForm.append("password", form.password);
  return signInForm;
};

const updateFrom = (updated_data) => {
  const updateForm = new FormData();
  for (let attribute in updated_data) {
    updateForm.append(attribute, updated_data[attribute]);
  }
  return updateForm;
};

const signUpForm = (form) => {
  const formData = new FormData();
  for (let attribute in form) {
    formData.append(attribute, form[attribute]);
  }
  return formData;
};

const apiUrls = {
  login: "/api/user/login",
  getUser: "/api/user/user",
  logout: "/api/user/logout",
  update: "/api/user/update",
  register: "/api/user/register",
};

module.exports = {
  apiUrls,
  signInForm,
  updateFrom,
  signUpForm,
};
