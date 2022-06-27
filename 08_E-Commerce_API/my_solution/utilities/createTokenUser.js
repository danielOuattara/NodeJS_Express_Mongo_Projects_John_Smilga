//--------------------------------------------------------------------------------------
const createTokenUser = (userObject) => {
  return {
    name: userObject.name,
    userId: userObject._id,
    role: userObject.role,
  };
};

//-------------------------------------------------------------

module.exports = { createTokenUser };
