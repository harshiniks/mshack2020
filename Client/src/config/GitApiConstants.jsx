const { Octokit } = require("@octokit/rest");
//const gittoken = "bc0d9337c4714764557ce5bddc4983d4e7bd9f7f";
//export const gituser = "anukgupt";
const gittoken = "ecb0684f8eef466046b9496965d5f90ee8234b84";
export const gituser = "chandrasekharmudili";

export const octokit = new Octokit({
    auth: gittoken,
  });