import userModel from "./users.model"

// Find user by id
export const findUserById = async (userId) => {
  try {
    const user = await userModel.findOne({ where: { id: userId } })
    return Promise.resolve(user)
  } catch (err) {
    return Promise.reject({ error: "Error while querying mongo" })
  }
}

// Find user by custom filters query
export const getUsers = async (filterObject) => {
  if (!filterObject) {
    filterObject = {}
  }
  try {
    const response = await userModel.findAll({
      where: filterObject,
      include: {
        model: companyModel,
        attributes: ["company_name", "company_domain"],
      },
    })
    return Promise.resolve(response)
  } catch (err) {
    return Promise.reject(err)
  }
}

// Update user by id
export const updateUser = async (id, updateObj) => {
  try {
    const response = await userModel.update(updateObj, {
      where: {
        id: id,
      },
    })
    return Promise.resolve(response)
  } catch (err) {
    return Promise.reject(err)
  }
}

const userService = {
  findUserById,
  getUsers,
  findUserById
}
export default userService
