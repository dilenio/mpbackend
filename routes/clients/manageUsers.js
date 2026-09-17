const { CLIENTS_BASE_PATH } = require("../../constants/routes");

const getManageUsers = require("../../__mocks__/clients/manageUsers/manageUsers.json");
const updatePermissions = require("../../__mocks__/clients/manageUsers/updatePermissions.json");
const getPermissionList = require("../../__mocks__/clients/manageUsers/getPermissionList.json");

function registerManageUserRoutes(server) {
  server.get(`${CLIENTS_BASE_PATH}/manage_users`, (req, res) => {
    res.status(200).json(getManageUsers);
  });

  server.get(`${CLIENTS_BASE_PATH}/getPermissionList`, (req, res) => {
    res.status(200).json(getPermissionList);
  });

  server.post(`${CLIENTS_BASE_PATH}/manage_users/add`, (req, res) => {
    res.status(200).json({status: "success", message: "User added successfully!"});
  });

  server.post(
    `${CLIENTS_BASE_PATH}/manage_users/permission/:username_hash`,
    (req, res) => {
      const { username_hash } = req.params;
      res.status(200).json(updatePermissions);
    },
  );
}

module.exports = registerManageUserRoutes;
