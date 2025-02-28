import SlotMachine from "../../../components/slotMachine/host";
import Lottie from 'lottie-react';
import CongratsAnim from '../../../../public/congrats_anim.json';
import { useEffect, useState } from "react";
import WinningBoard from "../../../components/winningBoard";
import PlayerBet from "../../../components/playerBet";
import { players as mockPlayers } from "../../../mocks/data";
import { cn } from "../../../lib/utils";
import { Player } from "../../../types/types";

export function rankPlayers(players: Player[]): Player[] {
  return [...players].sort((a, b) => {
    if (b.balance !== a.balance) {
      return b.balance - a.balance;
    }
    return a.timeEnter.getTime() - b.timeEnter.getTime();
  });
}

const HostGameBoard = () => {
  const [winningModalIsOpen, setWinningModalIsOpen] = useState(false);
  const [playerBetModalIsOpen, setPlayerBetModalIsOpen] = useState(false);
  const [result, setResult] = useState<number[]>([0, 0, 0]);
  const [players, setPlayers] = useState<Player[]>();
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);

  const openModal = (type: 'winning' | 'playerBet', symbol?: string) => {
    if (type === 'winning') setWinningModalIsOpen(true);
    if (type === 'playerBet' && symbol) {
      setSelectedSymbol(symbol);
      setPlayerBetModalIsOpen(true);
    }
  };

  const closeModal = (type: 'winning' | 'playerBet') => {
    if (type === 'winning') setWinningModalIsOpen(false);
    if (type === 'playerBet') setPlayerBetModalIsOpen(false);
  };

  const ModalCloseButton = ({ style, onClick }: { style: string; onClick: () => void }) => (
    <img
      src='/but_close.png'
      className={cn(`z-[100] absolute hover:brightness-105 h-28 cursor-pointer`, style)}
      onClick={onClick}
    />
  );

  const PlayerBetButton = ({ symbol }: { symbol: string }) => {
    const playersBetting = players?.filter(player =>
      player.bets.some(bet => bet.symbol === symbol)
    ) || [];

    const displayText =
      playersBetting.length <= 1 ? playersBetting[0]?.name :
        `${playersBetting.length} người chơi`;

    return (
      <button
        className={`relative flex justify-center items-center hover:brightness-105 w-full h-16 hover:cursor-pointer ${playersBetting.length > 0 ? '' : 'hidden'}`}
        onClick={() => openModal('playerBet', symbol)}
      >
        <img src='/button_type2.png' className="absolute w-full h-full" />
        <div className="z-10 flex flex-col justify-center items-center font-bold text-[#703626] capitalize">
          {displayText}
        </div>
      </button>
    );
  };

  useEffect(() => {
    setPlayers(mockPlayers);
  }, []);

  return (
    <div className="flex items-end gap-2 bg-[#ffd6ac] p-3 rounded-md w-full h-full overflow-x-hidden overflow-y-hidden">
      {winningModalIsOpen && <Lottie animationData={CongratsAnim} loop={1} className={`bottom-0 left-0 z-[100] absolute`} />}
      <WinningBoard isOpen={winningModalIsOpen} result={result} playerList={players ?? []} />
      {winningModalIsOpen && <ModalCloseButton style="top-0 right-[14%] " onClick={() => closeModal('winning')} />}
      <PlayerBet
        isOpen={playerBetModalIsOpen}
        symbol={selectedSymbol!}
        playerList={players?.filter(player =>
          player.bets.some(bet => bet.symbol === selectedSymbol)
        ) || []}
      />
      {playerBetModalIsOpen && <ModalCloseButton style="top-15 right-[27%]" onClick={() => closeModal('playerBet')} />}
      <div className="relative flex flex-col shadow-xl border-10 border-white rounded-md w-[80%] h-[98%]">
        <div className="-top-1 left-4 z-10 absolute flex items-center rounded-md -translate-y-1/2">
          <img src='/name_2.png' className="hover:brightness-105 w-68 hover:cursor-pointer" />
        </div>
        <div className="flex flex-col bg-[#fff8e2] border-[#703626] border-[2px] rounded-md w-full h-full">
          <div className="relative flex flex-col justify-center items-center h-[60%]">
            <SlotMachine setOpenModal={() => openModal('winning')} setResult={setResult} />
          </div>
          <div className="relative flex justify-between items-center p-2 w-full h-[40%]">
            <img src="/nuatre_trai_2.png" className="left-0 absolute flex pb-2 pl-2 w-1/2 h-full" />
            <img src="/nuatre_2.png" className="right-0 absolute flex pr-2 pb-2 w-1/2 h-full" />
            <div className="absolute flex justify-center items-center space-x-10 mt-5 w-full h-full">
              <div className="flex flex-col justify-center items-center">
                <img src='/dat_tom.png' className="w-full h-38" />
                <PlayerBetButton symbol="tôm" />
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_bau.png' className="w-full h-38" />
                <PlayerBetButton symbol="bầu" />
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_ga.png' className="w-full h-38" />
                <PlayerBetButton symbol="gà" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src='/dat_ca.png' className="w-full h-38" />
                <PlayerBetButton symbol="cá" />
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_cua.png' className="w-full h-38" />
                <PlayerBetButton symbol="cua" />
              </div>
              <div className="flex flex-col justify-center">
                <img src='/dat_nai.png' className="w-full h-38" />
                <PlayerBetButton symbol="nai" />
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
              <div className="flex justify-between items-center space-x-1 w-full">
                <button className="flex justify-center items-center bg-gradient-to-b from-[#ffffe5] via-[#ffffb7] to-[#ffe3b7] shadow-md hover:brightness-105 border border-amber-900 rounded-lg w-[37%] h-8 text-xs text-nowrap hover:cursor-pointer">
                  <p className="text-base">💰</p>
                  <p className="font-semibold">Tính tiền</p>
                </button>
                <button className="flex justify-center items-center bg-gradient-to-b from-[#ffffe5] via-[#ffffb7] to-[#ffe3b7] shadow-md hover:brightness-105 border border-amber-900 rounded-lg w-[63%] h-8 text-xs hover:cursor-pointer">
                  <p className="mr-1 text-base">📋</p>
                  <p className="font-semibold">Người chơi</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex shadow-xl mt-11 border-10 border-white rounded-md w-full h-[48%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_2.png' />
          </div>
          <div className="flex bg-[#fff8e2] border-[2px] border-[rgb(112,54,38)] rounded-md w-full h-full">
            <div className="grid grid-rows-1 w-full overflow-hidden">
              <table className="mt-5 w-full border-collapse">
                <tbody>
                  {players && players.map((player, index) => (
                    <tr key={player.id} className={`odd:bg-[#ffdf8d] bg-[#FFFFB7] text-sm flex py-1 h-10 w-full justify-between items-center font-semibold border-b`}>
                      <td className="flex justify-center items-center px-2 w-[20%]">
                        {index + 1 <= 3 ? (
                          <img src={`/rank${index + 1}.png`} className="h-10" />
                        ) : (
                          <p className="flex justify-center items-center h-full">{index + 1}</p>
                        )}
                      </td>
                      <td className="flex px-2 w-[70%]">{player.name}</td>
                      <td className="flex justify-end px-2 w-[10%]">{player.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {winningModalIsOpen && <Lottie animationData={CongratsAnim} loop={1} className={`right-0 bottom-0 z-[100] absolute -scale-x-100`} />}
    </div>
  )
}

export default HostGameBoard