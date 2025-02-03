import { RiMoneyEuroBoxLine } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";
import SlotMachine from "../../components/slotMachine";

interface Player {
  id: number;
  name: string;
  award: number;
}

const players: Player[] = [
  { id: 1, name: "Công Hậu", award: 12000 },
  { id: 2, name: "Hoàng Linh", award: 8000 },
  { id: 3, name: "Phương Toàn", award: 8000 },
  { id: 4, name: "Dịu Hiền", award: 6000 },
  { id: 5, name: "Đức Anh", award: 4000 },
  { id: 6, name: "Thành Nhân", award: 2000 },
  { id: 7, name: "Trọng Huy", award: 2000 },
  { id: 8, name: "Đại Vĩ", award: 0 },
];

const Home = () => {
  return (
    <div className="flex items-end gap-2 rounded-md w-full h-full">
      <div className="relative flex flex-col border-10 border-white shadow-xl rounded-md w-[80%] h-[98%]">
        <div className="-top-1 left-4 absolute flex items-center rounded-md -translate-y-1/2">
          <img src='/name_2.png' className="hover:brightness-105 w-68 hover:cursor-pointer" />
        </div>
        <div className="flex flex-col border-[#703626] border-[2px] bg-[#fff8e2] rounded-md w-full h-full">
          <div className="relative flex flex-col justify-center items-center h-[60%]">
            <SlotMachine />
          </div>
          <div className="relative flex justify-between items-center p-2 w-full h-[40%]">
            <img src="/nuatre_trai_2.png" className="w-full h-full" />
            <img src="/nuatre_2.png" className="w-full h-full" />
            <div className="absolute flex justify-center items-center space-x-10 mt-5 w-full h-full">
              <div className="flex flex-col justify-center items-center">
                <img src='/dat_tom.png' className="w-full h-38" />
                {/* <button
                  className="relative hover:brightness-105 flex justify-center items-center w-full h-16 hover:cursor-pointer"
                >
                  <img src='/button_type2.png' className="absolute w-full h-full" />
                  <div className="z-10 flex flex-col justify-center items-center font-bold text-amber-800 capitalize">
                    <p>Dịu Hiền</p>
                  </div>
                </button> */}
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_bau.png' className="w-full h-38" />
                {/* <button
                  className="relative hover:brightness-105 flex justify-center items-center h-16 hover:cursor-pointer"
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
                  className="relative hover:brightness-105 flex justify-center items-center h-16 hover:cursor-pointer"
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
                  className="relative hover:brightness-105 flex justify-center items-center h-16 hover:cursor-pointer"
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
                  className="relative hover:brightness-105 flex justify-center items-center h-16 hover:cursor-pointer"
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
                  className="relative hover:brightness-105 flex justify-center items-center h-16 hover:cursor-pointer"
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
        <div className="relative flex border-10 border-white bg-[#fff8e2] shadow-xl rounded-md w-full h-[44%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_1.png' />
          </div>
          <div className="flex flex-col space-y-4 border-[#703626] border-[2px] bg-[#fff8e2] p-2 rounded-md w-full h-full">
            <div className="flex bg-[#ffdf8d] mt-5 rounded-xl w-full h-24">
              <div className="flex flex-col justify-center items-center space-y-1 w-2/3 h-full">
                <p className="font-bold text-sm">MÃ PHÒNG</p>
                <p className="bg-[#ffcb46] px-6 py-1 border rounded-xl font-bold text-2xl">092317</p>
              </div>
              <div className="flex justify-center items-center w-1/3 h-full">
                <img src='/sample_qr.png' className="bg-gray-50 rounded-md w-20 h-20" />
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-2 bg-[#ffdf8d] p-2 rounded-xl w-full h-40">
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
                <button className="flex justify-center items-center bg-[#ffffb7] border rounded-lg w-1/3 h-8 text-nowrap text-xs">
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
        <div className="relative flex border-10 border-white bg-[#fff8e2] shadow-xl mt-11 rounded-md w-full h-[48%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_2.png' />
          </div>
          <div className="flex border-[2px] border-[rgb(112,54,38)] bg-[#fff8e2] rounded-md w-full h-full">
            <div className="grid grid-rows-1 w-full overflow-hidden">
              <table className="border-collapse mt-5 w-full">
                <tbody>
                  {players.map((player) => (
                    <tr key={player.id} className={`odd:bg-[#ffdf8d] text-sm font-semibold ${player.id === 1 ? '' : 'border-t'}`}>
                      <td className="px-2 py-1">{player.id}</td>
                      <td className="px-2 py-1">{player.name}</td>
                      <td className="text-right px-2 py-1">{player.award}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home