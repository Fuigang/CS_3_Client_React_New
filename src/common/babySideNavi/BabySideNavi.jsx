import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BabyController from "./babyController/BabyController";
import styles from "./BabySideNavi.module.css";
import BabyButton from "../../member/babyIndex/babyButton/BabyButton";

// isPrengant : 현재 사용자가 임산부 상태인지
const BabySideNavi = () => {
  return (
    <div>
      <div>
        <BabyButton />
      </div>

      <div>
        {/*아래쪽 아기 추가 및 바꾸는 버튼*/}
        <BabyController />
      </div>
    </div>
  );
};
export default BabySideNavi;
