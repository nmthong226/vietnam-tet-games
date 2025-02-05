import React, { useState, useRef } from "react";
import "./style.scss";

// const iconMap = ["Tôm", "Cá", "Cua", "Gà", "Nai", "Bầu"];
const iconHeight = 79;
const numIcons = 6;
const timePerIcon = 100;

const SlotMachine: React.FC = () => {
  const [indexes, setIndexes] = useState<number[]>([0, 0, 0]);
  const [rolling, setRolling] = useState<boolean>(false);
  const reelsRef = useRef<HTMLDivElement[]>([]);

  const roll = (reel: HTMLDivElement, offset: number): Promise<number> => {
    const delta = (offset + 2) * numIcons + Math.floor(Math.random() * numIcons);
    const backgroundPositionY = parseFloat(getComputedStyle(reel).backgroundPositionY) || 0;
    const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
    const normTargetBackgroundPositionY = targetBackgroundPositionY % (numIcons * iconHeight);

    return new Promise((resolve) => {
      setTimeout(() => {
        reel.style.transition = `background-position-y ${(8 + delta) * timePerIcon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;
      }, offset * 150);

      setTimeout(() => {
        reel.style.transition = "none";
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % numIcons);
      }, (8 + delta) * timePerIcon + offset * 150);
    });
  };

  const rollAll = () => {
    setRolling(true);
    if (reelsRef.current.length !== 3) return;

    Promise.all(reelsRef.current.map((reel, i) => roll(reel, i))).then((deltas) => {
      setIndexes((prevIndexes) =>
        prevIndexes.map((index, i) => (index + deltas[i]) % numIcons)
      );
      setRolling(false);
    });
  };

  return (
    <div>
      <div className="-top-1 right-4 absolute flex space-x-2">
        <button
          className={`flex items-center rounded-md -translate-y-1/2 ${rolling ? 'brightness-75 cursor-not-allowed' : 'hover:brightness-105 hover:cursor-pointer'}`}
          disabled={rolling}
          onClick={rollAll}>
          <img src='/but_4.png' className="w-48" />
        </button>
        <button
          className={`flex items-center rounded-md -translate-y-1/2 ${rolling ? 'brightness-75 cursor-not-allowed' : 'hover:brightness-105 hover:cursor-pointer'}`}
          disabled={rolling}
          onClick={rollAll}>
          <img src='/but_3.png' className="w-32" />
        </button>
      </div>
      <div className="relative p-1.5 rounded-md scale-115 slot-machine">
        <img src="/phao_a.png" className="-top-3 -left-10 z-50 absolute w-fit h-full" />
        <img src="/phao_b.png" className="-top-3 -right-12 z-50 absolute w-fit h-full" />
        <div className="space-x-2 rounded-md slots">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="reel"
              ref={(el) => el && (reelsRef.current[i] = el)}
              style={{ backgroundPositionY: `${indexes[i] * iconHeight}px` }}
            />
          ))}
        </div>
        {/* <div className="">{rolling ? "Chờ Tí..." : indexes.map((i) => iconMap[i]).join(" - ")}</div> */}
      </div>
    </div>
  );
};

export default SlotMachine;
