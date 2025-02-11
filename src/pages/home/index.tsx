import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";
import SlotMachine from "../../components/slotMachine";
import Lottie from 'lottie-react';
import CongratsAnim from '../../../public/congrats_anim.json';
import { useState } from "react";
import WinningBoard from "../../components/winningBoard";

interface Player {
  rank: number;
  name: string;
  award: number;
}

const players: Player[] = [
  { rank: 1, name: "Người chơi 1", award: 12000 },
  { rank: 2, name: "Người chơi 2", award: 8000 },
  { rank: 3, name: "Người chơi 3", award: 8000 },
  { rank: 4, name: "Người chơi 4", award: 6000 },
  { rank: 5, name: "Người chơi 5", award: 4000 },
  { rank: 6, name: "Người chơi 6", award: 2000 },
  { rank: 7, name: "Người chơi 7", award: 2000 },
  { rank: 8, name: "Người chơi 8", award: 0 },
];

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className="flex items-end gap-2 p-3 rounded-md w-full h-full overflow-x-hidden overflow-y-hidden">
      {modalIsOpen && <Lottie animationData={CongratsAnim} loop={2} className={`bottom-0 left-0 z-[100] absolute`} />}
      <WinningBoard isOpen={modalIsOpen} />
      {modalIsOpen &&
        (
          <div onClick={closeModal}>
            <img src='/but_close.png' className="top-0 right-[14%] z-[100] absolute hover:brightness-105 h-28 cursor-pointer" />
          </div>
        )
      }
      <div className="relative flex flex-col shadow-xl border-10 border-white rounded-md w-[80%] h-[98%]">
        <div className="-top-1 left-4 z-10 absolute flex items-center rounded-md -translate-y-1/2">
          <img src='/name_2.png' className="hover:brightness-105 w-68 hover:cursor-pointer" />
        </div>
        <div className="flex flex-col bg-[#fff8e2] border-[#703626] border-[2px] rounded-md w-full h-full">
          <div className="relative flex flex-col justify-center items-center h-[60%]">
            <SlotMachine setOpenModal={openModal} />
          </div>
          <div className="relative flex justify-between items-center p-2 w-full h-[40%]">
            <img src="/nuatre_trai_2.png" className="left-0 absolute flex pb-2 pl-2 w-1/2 h-full" />
            <img src="/nuatre_2.png" className="right-0 absolute flex pr-2 pb-2 w-1/2 h-full" />
            <div className="absolute flex justify-center items-center space-x-10 mt-5 w-full h-full">
              <div className="flex flex-col justify-center items-center">
                <img src='/dat_tom.png' className="w-full h-38" />
                <button
                  className="relative flex justify-center items-center hover:brightness-105 w-full h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-[#703626] capitalize">
                    <p>{players[0].name}</p>
                  </div>
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_bau.png' className="w-full h-38" />
                {/* <button
                  className="relative flex justify-center items-center hover:brightness-105 h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-amber-800 capitalize">
                    <p>Dịu Hiền</p>
                  </div>
                </button> */}
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_ga.png' className="w-full h-38" />
                {/* <button
                  className="relative flex justify-center items-center hover:brightness-105 h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-amber-800 capitalize">
                    <p>Dịu Hiền</p>
                  </div>
                </button> */}
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src='/dat_ca.png' className="w-full h-38" />
                {/* <button
                  className="relative flex justify-center items-center hover:brightness-105 h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-amber-800 capitalize">
                    <p>Dịu Hiền</p>
                  </div>
                </button> */}
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_cua.png' className="w-full h-38" />
                {/* <button
                  className="relative flex justify-center items-center hover:brightness-105 h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-amber-800 capitalize">
                    <p>Dịu Hiền</p>
                  </div>
                </button> */}
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_nai.png' className="w-full h-38" />
                {/* <button
                  className="relative flex justify-center items-center hover:brightness-105 h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-amber-800 capitalize">
                    <p>Dịu Hiền</p>
                  </div>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-end rounded-md w-[20%] h-full">
        <div className="relative flex bg-[#fff8e2] shadow-xl border-10 border-white rounded-md w-full h-[44%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_1.png' />
          </div>
          <div className="flex flex-col space-y-4 bg-[#fff8e2] p-2 border-[#703626] border-[2px] rounded-md w-full h-full">
            <div className="flex bg-[#ffdf8d] mt-5 rounded-xl w-full h-[30%]">
              <div className="flex flex-col justify-center items-center space-y-1 w-2/3 h-full">
                <p className="font-bold text-sm">MÃ PHÒNG</p>
                <p className="bg-[#ffcb46] px-6 py-1 border rounded-xl font-bold text-2xl">092317</p>
              </div>
              <div className="flex justify-center items-center p-2 w-1/3 h-full">
                <img src='/sample_qr.png' className="bg-gray-50 rounded-md w-20 h-full" />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-2 bg-[#ffdf8d] p-2 rounded-xl w-full h-[70%]">
              <div className="flex justify-between items-center pl-4 w-full font-bold">
                <p className="w-1/3">HOST</p>
                <p className="flex justify-end items-center bg-[#ffcb46] p-2 border rounded-lg w-2/3 capitalize">
                  Minh Thông
                </p>
              </div>
              <div className="flex justify-between items-center pl-4 w-full font-bold">
                <p className="w-1/3">$$$</p>
                <p className="flex justify-end items-center bg-[#ffcb46] p-2 border rounded-lg w-2/3 capitalize">
                  20000
                </p>
              </div>
              <div className="flex justify-between items-center space-x-3 w-full">
                <button className="flex justify-center items-center bg-[#ffffb7] border rounded-lg w-1/3 h-8 text-xs text-nowrap">
                  <RiMoneyEuroBoxLine className="mr-1" />
                  <p className="font-semibold">Tính tiền</p>
                </button>
                <button className="flex justify-center items-center bg-[#ffffb7] border rounded-lg w-2/3 h-8 text-xs">
                  <CiBoxList className="mr-1" />
                  <p className="font-semibold">Người chơi</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex bg-[#fff8e2] shadow-xl mt-11 border-10 border-white rounded-md w-full h-[48%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_2.png' />
          </div>
          <div className="flex bg-[#fff8e2] border-[2px] border-[rgb(112,54,38)] rounded-md w-full h-full">
            <div className="grid grid-rows-1 w-full overflow-hidden">
              <table className="mt-5 w-full border-collapse">
                <tbody>
                  {players.map((player) => (
                    <tr key={player.rank} className={`odd:bg-[#ffdf8d] text-sm flex py-1 h-10 w-full justify-between items-center font-semibold ${player.rank === 1 ? '' : 'border-t'}`}>
                      <td className="flex justify-center items-center px-2 w-[20%]">
                        {player.rank <= 3 ? (
                          <img src={`/rank${player.rank}.png`} className="h-10" />
                        ) : (
                          <p className="flex justify-center items-center h-full">{player.rank}</p>
                        )}
                      </td>
                      <td className="flex px-2 w-[70%]">{player.name}</td>
                      <td className="flex justify-end px-2 w-[10%]">{player.award}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {modalIsOpen && <Lottie animationData={CongratsAnim} loop={2} className={`right-0 bottom-0 z-[100] absolute -scale-x-100`} />}
    </div>
  )
}

export default Home