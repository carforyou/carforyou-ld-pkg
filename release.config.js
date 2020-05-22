// Configuration for semantic-release
module.exports = {
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    {
      name: "!(+([0-9])?(.{+([0-9]),x}).x|master)",
      prerelease: "${ name }" + `-${process.env.CIRCLE_SHA1}`,
    },
  ],
  pkgRoot: "pkg",
}
