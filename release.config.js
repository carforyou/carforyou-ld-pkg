// Configuration for semantic-release
module.exports = {
  pkgRoot: "pkg",
  branches: [
    "+([0-9])?(.{+([0-9]),x}).x",
    "master",
    { name: "!(+([0-9])?(.{+([0-9]),x}).x|master)", prerelease: true }
  ]
}
