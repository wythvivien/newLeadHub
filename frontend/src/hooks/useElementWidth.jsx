import { useEffect, useRef, useState } from "react";

const useElementWidth = () => {
  const elementRef = useRef(null);
  const [collectionWidth, setCollectionWidth] = useState("");


  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      const newWidth = element.getBoundingClientRect().width;
      switch (true) {
        case newWidth >= 1280:
          setCollectionWidth("grid-cols-4");
          break;
        case newWidth >= 1024:
          setCollectionWidth("grid-cols-3");
          break;
        case newWidth >= 540:
          setCollectionWidth("grid-cols-2");
          break;
        case newWidth < 540:
          setCollectionWidth("grid-cols-1");
          break;
      }
    }
  });

  return { elementRef, collectionWidth };
};

export default useElementWidth;
