import { useState } from "react";
import FaceRecognition from "./FaceRecognition";
import InputForm from "./InputForm";
import NavBar from "./NavBar";
import Footer from "./Footer";
import apiUrl from "../utils/apiUrl";
import { UserContextType } from "../../types";
import { RawBox, CalculatedBox } from "../../types";
import "../styles/Home.scss";

export function Home({ user, setUser }: UserContextType) {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boxes, setBoxes] = useState<CalculatedBox[]>([]);

  const fetchBoxes = async (input: string) => {
    await fetch(`${apiUrl}/image`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        input: input,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data: RawBox[]) => {
        if (data && data.length > 0) {
          calculateBoundingBoxes(data);
        } else {
          setBoxes([]); // Clear boxes if no faces detected or data is empty
        }
      })
      .catch((err) => {
        console.log(err);
        setBoxes([]); // Clear boxes on error
      });
  };

  const calculateBoundingBoxes = (data: RawBox[]) => {
    const image = document.getElementById("input-image") as HTMLImageElement;
    if (!image) {
      return;
    }

    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);

    const boundingBoxes = data.map((item) => {
      const originalImageWidth = item._imageDims._width;
      const originalImageHeight = item._imageDims._height;

      const scaledLeftCol = (item._box._x / originalImageWidth) * imageWidth;
      const scaledTopRow = (item._box._y / originalImageHeight) * imageHeight;
      const scaledWidth = (item._box._width / originalImageWidth) * imageWidth;
      const scaledHeight =
        (item._box._height / originalImageHeight) * imageHeight;

      return {
        leftCol: scaledLeftCol,
        topRow: scaledTopRow,
        width: scaledWidth,
        height: scaledHeight,
      };
    });
    setBoxes(boundingBoxes);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = async () => {
    if (!input) {
      return;
    }
    setImageUrl(input);
    await fetchBoxes(input);
  };

  return (
    <main className="home-main">
      <NavBar user={user} setUser={setUser} />
      <InputForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
      <Footer />
    </main>
  );
}

export default Home;
