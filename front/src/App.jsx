import { useState } from "react";
import {
  Navbar,
  InputField,
  CustomButton,
  Datatable,
  Alert,
  OnBoardModal,
} from "./components";
import { useGlobalContext } from "./context";

function App() {
  const {
    showAlert,
    showTable,
    deployContract,
    contract,
    initContract,
    setShowAlert,
    approve,
  } = useGlobalContext();

  const [form, setForm] = useState({
    arbiter: "",
    beneficiary: "",
    value: "",
  });

  const [contractAddress, setContractAdrress] = useState("")

  const handleFormFieldChange = (fieldName, value) => {
    setForm({ ...form, [fieldName]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (form.arbiter == "" || form.beneficiary == "" || form.value == "") {
      setShowAlert({
        status: true,
        type: "error",
        message: "Please fill all the fields",
      });
      return;
    } else if (form.arbiter == form.beneficiary) {
      setShowAlert({
        status: true,
        type: "error",
        message: "Arbiter and Beneficiary can't be same",
      });
      return;
    } else if (parseFloat(form.value) < 0.01) {
      console.log("form.value", parseFloat(form.value));
      setShowAlert({
        status: true,
        type: "error",
        message: "Amount must be greater or equal to 0.01 Eth",
      });
      return;
    }
    initContract(form.arbiter, form.beneficiary, form.value);

  };

  const handleApproved = (e) => {
    e.preventDefault();
    if (contractAddress == "") {
      setShowAlert({
        status: true,
        type: "error",
        message: "The address is required",
      });
      return;
    }

    approve(contractAddress);
  }

  return (
    <div className="overflow-hidden flex flex-col justify-center items-center md:px-20 px-1">
      <OnBoardModal />
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <Navbar />

      <div className="flex md:flex-row flex-col w-full justify-center items-center mt-4">
        <div className="bg-[#111111] md:w-[45%]  drop-shadow-2xl border-[0.01px] border-gray-500 rounded-md">
          <h1 className="text-[24px] m-3 border-b-[0.01px] border-gray-600">
            Deploy contract
          </h1>

          <div className="h-[340px] md:w-[95%] w-[26rem] flex flex-col justify-center items-center">
            {contract == "" ? (
              <>
                <div className="flex justify-center items-center">
                  You need to deploy your own escrow contract before initiate it
                  !!!
                </div>
                <div className="m-2">
                  <CustomButton
                    type="button"
                    title="Deploy"
                    restStyles=""
                    handleClick={deployContract}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex justify-center items-center">
                    You have already deployed your contract !!!
                  </div>
                  <div className=" md:text-lg text-sm text-siteViolet">
                    {contract}
                    <div className="m-2 flex justify-center items-center">
                      <CustomButton
                        type="button"
                        title="Deploy new contract"
                        restStyles=""
                        handleClick={deployContract}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="w-5 h-5" />
        <div className="bg-[#111111] md:w-[45%] drop-shadow-2xl border-[0.01px] border-gray-500 rounded-md">
          <h1 className="text-[24px] m-3 border-b-[0.01px] border-gray-600">
            {" "}
            Initialise Escrow{" "}
          </h1>
          <form className="w-full flex flex-col m-2" onSubmit={submitForm}>
            <InputField
              label="Arbiter"
              value={form.arbiter}
              placeHolder="0xbA83dbb1Bbc53C43D71f33630A0b8Ff49c688Ca2"
              handleValueChange={(e) =>
                handleFormFieldChange("arbiter", e.target.value)
              }
            />
            <InputField
              label="Beneficiary"
              placeHolder="0xbA83dbb1Bbc53C43D71f33630A0b8Ff49c688Ca2"
              value={form.beneficiary}
              handleValueChange={(e) =>
                handleFormFieldChange("beneficiary", e.target.value)
              }
            />
            <InputField
              label="Amount"
              placeHolder="0.01 Eth"
              value={form.value}
              handleValueChange={(e) =>
                handleFormFieldChange("value", e.target.value)
              }
            />
            <div className="flex justify-center items-center m-2">
              <CustomButton type="submit" title="Initiate" restStyles="" />
            </div>
          </form>
        </div>
      </div>
      <div className=" bg-[#111111] md:w-[45%] w-[26rem] drop-shadow-2xl border-[0.01px] border-gray-500 rounded-md m-2">
        <h1 className="text-[24px] m-3 border-b-[0.01px] border-gray-600">
          {" "}
          Approved Escrow{" "}
        </h1>
        <div className="flex flex-col justify-center items-center w-full h-[340px]">
          <div className="flex justify-center items-center">
            Approve an Escrow contract!!!
          </div>
          <div className=" md:text-lg text-sm text-siteViolet">
            <span className="flex justify-center items-center">
              NB : You can approve only if you are the arbiter of the contract
            </span>
            <div className="m-2 flex justify-center items-center">
              <form className="w-full flex flex-col" onSubmit={handleApproved}>
                <InputField
                  label="Contract Address"
                  placeHolder="0xbA83dbb1Bbc53C43D71f33630A0b8Ff49c688Ca2"
                  value={contractAddress}
                  handleValueChange={(e) =>
                    setContractAdrress(e.target.value)
                  }
                />
                <div className="flex flex-col justify-center items-center m-2">
                  <CustomButton
                    type="submit"
                    title="Approve"
                    restStyles=""
                    // handleClick={handleApproved}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showTable && <Datatable />}
    </div>
  );
}

export default App;
