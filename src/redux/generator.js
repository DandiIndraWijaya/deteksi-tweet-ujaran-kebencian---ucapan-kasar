export const generatorAction = (name) => ({
  begin: `${name}_BEGIN`,
  success: `${name}_SUCCESS`,
  fail: `${name}_FAIL`,
});
