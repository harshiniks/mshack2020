const { Octokit } = require("@octokit/rest");
//const gittoken = "**";
//export const gituser = "anukgupt";
const gittoken = "**";
export const gituser = "chandrasekharmudili";

export const octokit = new Octokit({
    auth: gittoken,
  });
