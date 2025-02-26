import React, { useState, useRef, useEffect } from "react";
import { PiSpinnerBallFill } from "react-icons/pi";
import { HiUserGroup } from "react-icons/hi2";

import "./style.scss";
import { Link } from "react-router-dom";

const iconHeight = 79;
const numIcons = 6;
const timePerIcon = 100;

interface PlayerSlotMachineProps {
  setOpenModal: () => void;
  setResult: (results: number[]) => void;
}

const PlayerSlotMachine: React.FC<PlayerSlotMachineProps> = ({ setOpenModal, setResult }) => {
  const [indexes, setIndexes] = useState<number[]>([0, 0, 0]);
  const [rolling, setRolling] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
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
      setTimeout(() => setOpenModal(), 1000);
    });
  };

  useEffect(() => {
    setResult(indexes);
  }, [indexes]);

  useEffect(() => {
    let timer: number | NodeJS.Timeout = 0;
    if (countdown !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev as number) - 1);
      }, 1000);
    } else if (countdown === 0) {
      clearInterval(timer);
      setCountdown(null);
      setRolling(true);
      rollAll();
      setTimeout(() => setRolling(false), 2000); // Simulate rolling effect
    }
    return () => clearInterval(timer);
  }, [countdown, rollAll]);

  return (
    <div className="flex justify-between items-center px-4 w-full h-full">
      <div className="-top-1 right-4 absolute flex space-x-2">
        <button
          className={`flex relative items-center rounded-md -translate-y-1/2 z-10 ${rolling || countdown !== null ? 'brightness-75 cursor-not-allowed' : 'hover:brightness-105 hover:cursor-pointer'}`}
          disabled={rolling || countdown !== null}
          onClick={rollAll}>
          <img src='/but_5.png' className="w-48" />
          <div className="absolute flex justify-center items-center space-x-1 pb-1 w-full">
            <HiUserGroup className={`size-5 text-[#5a2a2a] ${rolling ? 'hidden' : ''}`} />
            <PiSpinnerBallFill className={`size-5 text-[#5a2a2a] ${rolling ? 'animate-spin' : 'hidden'}`} />
            <p className="font-bold text-[#5a2a2a] text-[16px] text-center text-nowrap">
              {rolling ? `${countdown} | 0/19 người` : "Chờ Host"}
            </p>
          </div>
        </button>
      </div>
      <div className="relative flex justify-center items-center">
        <div className="">
          <img src="/thanhchucnang_2.png" />
        </div>
        <div className="absolute flex flex-col items-center space-y-3">
          <Link to='/' className="group relative">
            <img src="/chucnang_2.png" className="w-10 hover:scale-110 duration-200 ease-in-out hover:cursor-pointer transform" />
            <div className="group-hover:visible invisible top-2 left-14 absolute flex items-center font-semibold text-white text-center text-nowrap">
              <hr className="border-t-2 border-red-800 w-4" />
              <div className="flex justify-center items-center bg-[#bf0d0d] px-3 rounded-xl">
                <p>🏵️ Trang Chủ</p>
              </div>
            </div>
          </Link>
          <div className="group relative">
            <img src="/chucnang_1.png" className="w-12 hover:scale-110 duration-200 ease-in-out hover:cursor-pointer transform" />
            <div className="group-hover:visible invisible top-2 left-15 absolute flex items-center font-semibold text-white text-center text-nowrap">
              <hr className="border-t-2 border-red-800 w-4" />
              <div className="flex justify-center items-center bg-[#bf0d0d] px-3 rounded-xl">
                <p>🏵️ Chỉnh Nhạc</p>
              </div>
            </div>
          </div>
          <div className="group relative">
            <img src="/chucnang_3.png" className="w-10 hover:scale-110 duration-200 ease-in-out hover:cursor-pointer transform" />
            <div className="group-hover:visible invisible top-2 left-14 absolute flex items-center font-semibold text-white text-center text-nowrap">
              <hr className="border-t-2 border-red-800 w-4" />
              <div className="flex justify-center items-center bg-[#bf0d0d] px-3 rounded-xl">
                <p>🏵️ Hướng Dẫn</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="relative p-1.5 rounded-md scale-115 slot-machine">
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
      </div> */}
      <div className="relative flex justify-center items-center">
        <div className="">
          <img src="/thanhchucnang_2.png" />
        </div>
        <div className="absolute flex flex-col items-center space-y-3">
          <div className="group relative">
            <div className="group-hover:visible invisible top-2 right-14 absolute flex items-center font-semibold text-white text-center text-nowrap">
              <div className="flex justify-center items-center bg-[#bf0d0d] px-3 rounded-xl">
                <p>Ván Mới 🏵️</p>
              </div>
              <hr className="border-t-2 border-red-800 w-4" />
            </div>
            <img src="/chucnang_5.png" className="w-10 hover:scale-110 duration-200 ease-in-out hover:cursor-pointer transform" />
          </div>
          <div className="group relative">
            <div className="group-hover:visible invisible top-2 right-15 absolute flex items-center font-semibold text-white text-center text-nowrap">
              <div className="flex justify-center items-center bg-[#bf0d0d] px-3 rounded-xl">
                <p>Tổng Kết 🏵️</p>
              </div>
              <hr className="border-t-2 border-red-800 w-4" />
            </div>
            <img src="/chucnang_4.png" className="w-12 hover:scale-110 duration-200 ease-in-out hover:cursor-pointer transform" />
          </div>
          <div className="group relative">
            <div className="group-hover:visible invisible top-2 right-14 absolute flex items-center font-semibold text-white text-center text-nowrap">
              <div className="flex justify-center items-center bg-[#bf0d0d] px-3 rounded-xl">
                <p>Lịch Sử 🏵️</p>
              </div>
              <hr className="border-t-2 border-red-800 w-4" />
            </div>
            <img src="/chucnang_6.png" className="w-10 hover:scale-110 duration-200 ease-in-out hover:cursor-pointer transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSlotMachine;
