const addPropertyForm = (form) => {
  const addPropertyForm = new FormData();
  for (let attribute in form) {
    switch (attribute) {
      case "facilities":
        for (let nested_attribute in form[attribute]) {
          addPropertyForm.append(
            nested_attribute,
            form[attribute][nested_attribute] === true ? "true" : "false"
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

const updatePropertyForm = (data, form) => {
  const updatePropertyForm = new FormData();
  for (let attribute in form) {
    switch (attribute) {
      case "facilities":
        for (let nested_attribute in form[attribute]) {
          if (
            data[attribute][nested_attribute] !==
            form[attribute[nested_attribute]]
          ) {
            updatePropertyForm.append(
              nested_attribute,
              form[attribute][nested_attribute] === true ? "true" : "false"
            );
          }
        }
        break;
      case "images":
        for (let nested_attribute in form[attribute]) {
          if (
            data[attribute][nested_attribute] !==
            form[attribute][nested_attribute]
          ) {
            if (form[attribute][nested_attribute] === null) {
              updatePropertyForm.append(nested_attribute, "Remove");
            } else {
              updatePropertyForm.append(
                nested_attribute,
                form[attribute][nested_attribute]
              );
            }
          }
        }
        break;
      default:
        if (data[attribute] !== form[attribute]) {
          updatePropertyForm.append(attribute, form[attribute]);
        }
    }
  }
  return updatePropertyForm;
};

const generateQueryString = (params, options) => {
  let active_params = [];
  for (let param in params) {
    switch (param) {
      case "terms":
      case "property_type":
      case "bedroom":
      case "bathroom":
        if (params[param] !== "") {
          active_params.push(`${param}=${params[param]}`);
        }
        break;
      case "min_area":
      case "max_area":
      case "min_price":
      case "max_price":
        if (params[param] !== 0) {
          active_params.push(`${param}=${params[param]}`);
        }
        break;
      default:
        if (params[param]) {
          active_params.push(`${param}=true`);
        }
        break;
    }
  }
  for (let option in options) {
    active_params.push(`${option}=${options[option]}`);
  }
  return `?${active_params.join("&")}`;
};

const apiUrls = {
  add: "/api/property/add",
  edit: "/api/property/edit",
  seller: "/api/property/owned",
  byId: "/api/property/id",
  query: "/api/property/query",
  contact: "/api/property/contact",
};

module.exports = {
  addPropertyForm,
  updatePropertyForm,
  generateQueryString,
  apiUrls,
};
