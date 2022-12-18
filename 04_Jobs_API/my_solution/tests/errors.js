const err = {
  errors: {
    email: {
      name: "ValidatorError",
      message: "Email is required !",
      properties: {
        message: "Email is required !",
        type: "required",
        path: "email",
      },
      kind: "required",
      path: "email",
    },
    name: {
      name: "ValidatorError",
      message: "Name is required !",
      properties: {
        message: "Name is required !",
        type: "required",
        path: "name",
      },
      kind: "required",
      path: "name",
    },
  },
  _message: "User validation failed",
  name: "ValidationError",
  message:
    "User validation failed: email: Email is required !, name: Name is required !",
};

// for (key in err.errors) {
//   console.log(key);
// }

console.log("Object.keys(err.errors)  = ", Object.keys(err.errors));

console.log("---------------------------------------------------");

console.log("Object.values(err.errors) = ", Object.values(err.errors));

console.log("---------------------------------------------------");

Object.values(err.errors).map((item) => {
  console.log(item.message);
});

const test = ["hello"];
console.log(test);
