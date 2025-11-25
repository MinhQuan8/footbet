const getFileName = (path, fileType = false) => {
    return fileType ? path.toString().split("\\").pop().split("/").pop() : path.toString().split("\\").pop().split("/").pop().split(".").shift();
};

export default getFileName;
