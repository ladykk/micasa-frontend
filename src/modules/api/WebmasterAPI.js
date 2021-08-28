const approveForm = (property_id, status) => {
  const approveForm = new FormData();
  approveForm.append("property_id", property_id);
  approveForm.append("status", status);
  return approveForm;
};

const apiUrls = {
  approve: "/api/webmaster/approve",
  agents: "/api/webmaster/agents",
  addAgent: "/api/webmaster/agents/add",
  deleteAgent: "/api/webmaster/agents/remove",
  customers: "/api/webmaster/customers",
  addCustomer: "/api/webmaster/customers/add",
  deleteCustomer: "/api/webmaster/customers/remove",
};

module.exports = {
  apiUrls,
  approveForm,
};
