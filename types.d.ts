export interface UserType {
  id: string;
  username: string;
  email: string;
  password: string;
  loggedIn: boolean;
}

export interface UserContextType {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
}

interface ImageDims {
  _width: number;
  _height: number;
}

interface Box {
  _x: number;
  _y: number;
  _width: number;
  _height: number;
}

interface Landmarks {
  _imgDims: ImageDims;
  _shift: { _x: number; _y: number };
  _positions: Array<{ _x: number; _y: number }>;
}

export interface RawBox {
  _imageDims: ImageDims;
  _score: number;
  _classScore: number;
  _className: string;
  _box: Box;
  landmarks?: Landmarks;
  unshiftedLandmarks?: Landmarks;
  alignedRect?: {
    _imageDims: ImageDims;
    _score: number;
    _classScore: number;
    _className: string;
    _box: Box;
  };
  descriptor?: { [key: string]: number };
}

export type CalculatedBox = {
  leftCol: number;
  topRow: number;
  width: number;
  height: number;
};
