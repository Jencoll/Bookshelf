import { createContext, useEffect, useState } from "react";

export const CloudinaryContext = createContext();

export const CloudinaryProvider = ({ children }) => {
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);
  const [fileUrlUploaded, setFileUrlUploaded] = useState(null);

  useEffect(() => {
    const cw = window.cloudinary.createUploadWidget(
      {
        cloudName: "jencol",
        uploadPreset: "rqdhvstd",
        folder: "Bookshelf",
        multiple: false,
        resourceType: "image",
        maxFileSize: 5500000,
        cropping: true,
      },
      (error, result) => {
        if (
          result?.event === "queues-end" &&
          result.info?.files &&
          result.info?.files.length > 0
        ) {
          console.log(
            "On a enfin un fichier: ",
            result.info.files[0].uploadInfo.secure_url
          );
          setFileUrlUploaded(result.info?.files[0].uploadInfo.secure_url);
        } else if (error) {
          console.log("An error occurred during the image upload: ", error);
        };
      }
    )
    setCloudinaryWidget(cw);
  }, []);

  const openUpload = () => {
    cloudinaryWidget?.open();
  };

  // useEffect(() => {
  //   console.log("Le fichier qui a été uploadé est : ", fileUrlUploaded);
  // }, [fileUrlUploaded]);

  return (
    <CloudinaryContext.Provider
      value={{ fileUrlUploaded, openUpload, cloudinaryWidget }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
};

// return <Button onClick={openUpload}>Upload your image</Button>;
// const CloudinaryUpdloadWidget = () => {
// };
// const Button = styled.button`
//     width: 200px;
//     height: 30px;
// `;
// export default CloudinaryUpdloadWidget;
