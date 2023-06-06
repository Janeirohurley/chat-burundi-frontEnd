import React from 'react';
import Dropzone from 'react-dropzone';
const Upload = () => {
    const getUploadParams = ({ meta }) => {
        const url = "http://localhost:3000/home"
        return {
            url, meta: {
                fileUrl:
                    `${url}/${encodeURIComponent(meta.name)}`
            }
        }
    }

    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta);
    }

    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        allFiles.forEach(f => f.remove())
    };
    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            accept="image/*,audio/*,video/*"
            inputContent={(files, extra) => (extra.reject ? "img,audio,video only" : "drag files")}
            styles={{
                dropzoneReject: {
                    borderColor: "red",
                    backgroundColor: "#DAA",
                },
                inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {})
            }}
        />
    )
}
export default Upload;