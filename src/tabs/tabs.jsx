import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { Footer } from "../components/exports";
import img from "../assets/download.png";
import Tooltip from "@mui/material/Tooltip";

const QRGeneratorUploader = () => {
  const [link, setLink] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [error, SetError] = useState("");
  const [fileName, SetFileName] = useState("EasyQR");
  const [edit, SetEdit] = useState(false);
  const [isdisable, SetDisable] = useState(true);

  useEffect(() => {
    if (chrome?.tabs?.query) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          setLink(tabs[0].url);
        }
      });
    }
  }, []);

  const generateQRCode = async () => {
    if (!link.trim()) {
      alert("Please enter a valid link");
      return;
    }
    try {
      const qr = await QRCode.toDataURL(link);
      setQRCode(qr);
    } catch (error) {
      console.error("Failed to generate QR code:", error);
    }
  };

  const TriggerError = (err) => {
    SetError(err);
    setTimeout(() => {
      SetError("");
    }, 3000);
  };

  const downloadQRCode = () => {
    if (!qrCode) {
      TriggerError("Please generate a QR code first!");
      return;
    }
    const a = document.createElement("a");
    a.href = qrCode;
    a.download = `${fileName}.png`;
    a.click();
  };

  const handleEditFileName = () => {
    SetEdit((prev) => !prev);
    SetDisable((prev) => !prev);
  };

  return (
    <main className="flex h-screen flex-col items-center bg-white justify-between rounded-t-2xl">
      
      <div className="w-[320px] h-auto bg-white pr-2 pl-2 pb-2 pt-4 rounded-lg flex flex-col items-center  ">
        <h1 className="text-base font-semibold mb-4 text-gray-800">QR Code Generator</h1>

        <div className="flex flex-col items-center gap-4 ">
          {qrCode ? (
            <img
              src={qrCode}
              alt="Generated QR Code"
              className="w-40 h-40 border border-gray-300 rounded"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex justify-center items-center rounded">
              <span className="text-gray-500 ">QR Code Preview</span>
            </div>
          )}
          <div className="flex justify-center items-center flex-col gap-2">
            <div>
              <input
                type="text"
                placeholder={`${fileName}.png`}
                disabled={isdisable}
                onChange={(e) => SetFileName(e.target.value)}
              />
              <button className="" onClick={handleEditFileName}>
                {edit ? "Save" : "Edit"}
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter a link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
              aria-label="Input link for QR code generation"
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={generateQRCode}
              className="px-4 py-2 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Generate QR Code
            </button>
            <Tooltip title="Download">
              <button
                onClick={downloadQRCode}
                className="w-8 h-8 flex items-center justify-center bg-green-500 text-white font-medium rounded shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
                aria-label="Download QR Code"
              >
                <img src={img} alt="Download Icon" height={24} width={24} />
              </button>
            </Tooltip>
          </div>
        </div>
        {error ? <p className="text-red-500">{error}</p> : ""}
      </div>
      <Footer className="mb-2" />
    </main>
  );
};

export default QRGeneratorUploader;
