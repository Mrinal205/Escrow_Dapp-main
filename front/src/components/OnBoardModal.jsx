import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { CustomButton } from ".";
import { useGlobalContext } from "../context";
import { GetParams, SwitchNetwork } from "../utils";
import styles from "../styles";

const OnBoardModal = () => {
  const {
    updateCurrentWalletAddress,
    setShowAlert,
    modalIsOpen,
    setWalletAddress,
    setIsOpen,
  } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams(setWalletAddress);
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  const rootRef = useRef(null);
  useEffect(() => {
    resetParams();

    window?.ethereum?.on("chainChanged", () => {
      resetParams();
    });

    window?.ethereum?.on("accountsChanged", () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              You don't have Core or Metasmask Wallet installed!
            </p>
            <CustomButton
              title="Download Core"
              handleClick={() => window.open("https://core.app/", "_blank")}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              You haven't connected your account to Metamask Wallet!
            </p>
            <CustomButton
              title="Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              You're on a different network. Switch to Sepolia testnet.
            </p>
            <CustomButton
              title="Switch"
              handleClick={() => {
                SwitchNetwork(setShowAlert);
              }}
            />
          </>
        );

      
    }
  };

  return (
    <Modal
      appElement={rootRef.current}
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect} h-full`}
      overlayClassName="Overlay"
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnBoardModal;
