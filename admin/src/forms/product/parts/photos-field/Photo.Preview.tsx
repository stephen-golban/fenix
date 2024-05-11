import React from "react";

import { Image } from "antd";

interface IPhotoPreview {
  source: string;
  visible: boolean;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
}

const PhotoPreview: React.FC<IPhotoPreview> = ({
  visible,
  source,
  setPreviewOpen,
  setPreviewImage,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <Image
      src={source}
      wrapperStyle={{ display: "none" }}
      preview={{
        visible,
        onVisibleChange: (visible) => setPreviewOpen(visible),
        afterOpenChange: (visible) => !visible && setPreviewImage(""),
      }}
    />
  );
};

export default PhotoPreview;
