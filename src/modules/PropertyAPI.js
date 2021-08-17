const addPropertyForm = (form) => {
  const addPropertyForm = new FormData();
  for (let attribute in form) {
    switch (attribute) {
      case "facilities":
        for (let nested_attribute in form[attribute]) {
          addPropertyForm.append(
            nested_attribute,
            form[attribute][nested_attribute] == true ? "true" : "false"
          );
        }
        break;
      case "images":
        for (let nested_attribute in form[attribute]) {
          addPropertyForm.append(
            nested_attribute,
            form[attribute][nested_attribute]
          );
        }
        break;
      default:
        addPropertyForm.append(attribute, form[attribute]);
    }
  }
  return addPropertyForm;
};

const apiUrls = {
  add: "/api/property/add",
};

module.exports = {
  addPropertyForm,
  apiUrls,
};
