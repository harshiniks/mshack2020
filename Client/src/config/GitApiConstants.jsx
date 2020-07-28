const { Octokit } = require("@octokit/rest");
const gittoken = "**";
export const gituser = "**";

export const octokit = new Octokit({
    auth: gittoken,
  });