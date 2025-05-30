import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useRef } from "react";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
  try {
      const response = await fetch('http://localhost:3000/api/upload');

      if (!response.ok) {
          const errorText = await response.text();
          console.error(`Request failed with status ${response.status}: ${errorText}`);
          throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;

      if (!signature || !expire || !token) {
          throw new Error('Missing token, signature, or expire in the response.');
      }

      return { signature, expire, token };
  } catch (error) {
      console.error(`Authentication request failed: ${error.message}`);
      return { signature: '', expire: '', token: '' }; // Fallback to prevent app crashes
  }
};


const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);
  const onError = (err) => {
    console.log("Error", err);
  };

  const onSuccess = (res) => {
    console.log("Success", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    const file = evt.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        onUploadProgress={onUploadProgress}
        onUploadStart={onUploadStart}
        style={{ display: "none" }}
        ref={ikUploadRef}
      />
      {
        <label onClick={() => ikUploadRef.current.click()}>
          <img src="https://conversai-img.s3.us-east-1.amazonaws.com/attachment.png" alt="" />
        </label>
      }
    </IKContext>
  );
};

export default Upload;
