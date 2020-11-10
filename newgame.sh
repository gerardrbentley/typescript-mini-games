if [[ -z $1 ]]
  then
    echo "No foldername supplied"
    exit 1
fi

mkdir -p "$(pwd)/$1"
cp -a "$(pwd)/base/." "$(pwd)/$1"