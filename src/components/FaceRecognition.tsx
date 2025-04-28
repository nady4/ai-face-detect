import { CalculatedBox } from "../../types";
import "../styles/FaceRecognition.scss";

type FaceRecognitionProps = {
  imageUrl: string;
  boxes: CalculatedBox[];
};

export const FaceRecognition = ({ imageUrl, boxes }: FaceRecognitionProps) => {
  return (
    <div className="face-recognition-container">
      <div className="face-recognition">
        <img
          id="input-image"
          src={imageUrl}
          height="auto"
          className="input-image"
        />
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              left: box.leftCol,
              width: box.width,
              height: box.height,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
