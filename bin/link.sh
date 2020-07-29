if [ -z "$1" ]; then
  echo "Usage:"
  echo "  npm run link -- <relative_path_to_project>"
fi

PROJECT_PATH="$1"
PACKAGE_PATH="$PWD"
BUILT_PACKAGE_PATH="$PACKAGE_PATH/pkg"
PROJECT_REACT_PATH="../$PROJECT_PATH/node_modules/react"

if [ ! -d $PROJECT_PATH ]; then
  echo "Looks like no project exists under `$PROJECT_PATH`. Aborting..."
fi

echo "Linking package ${PACKAGE_PATH} to project ${PROJECT_PATH}"
echo "> Building package"
npm run build

echo "> Linking package in the project"
cd $PROJECT_PATH
npm link $BUILT_PACKAGE_PATH

echo "> Linking package react back to project"
cd $BUILT_PACKAGE_PATH
npm link $PROJECT_REACT_PATH
