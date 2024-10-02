export const compressImage = (
  url: string | string[],
  quality: number,
  callback: any
) => {
  const img = new Image();
  img.src = url as string;
  img.crossOrigin = "Anonymous";

  img.onload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxWidth = 800; // Maximum width for resizing
    const maxHeight = 800; // Maximum height for resizing

    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx?.drawImage(img, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const compressedUrl = URL.createObjectURL(blob);
          callback(compressedUrl);
        } else {
          callback(url); // fallback to original URL if blob creation fails
        }
      },
      "image/jpeg",
      quality
    );
  };

  img.onerror = () => {
    callback(url); // fallback to original URL if there's an error
  };
};
