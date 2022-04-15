import { useEffect } from "react";

const CloudinaryUpdloadWidget = () => {

    // useEffect(() => {
    const cloud = () => {
        const cloudinaryWidget = window.cloudinary.createUploadWidget({
            cloudName: "jencol",
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
            }
          }
        );
        
        cloudinaryWidget.open();
    }
    
    //   cloudinaryWidget();
      
    // }, [])
    

    return (
        <button onClick={cloud()}>Click here</button>
    )

}

export default CloudinaryUpdloadWidget;