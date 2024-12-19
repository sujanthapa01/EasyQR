import React, { useState, useEffect } from "react";

function Footer() {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const manifest = chrome.runtime.getManifest();
    if (manifest?.version) {
      setVersion(manifest.version);
    }
  }, []);

  return (
    <div className="flex mb-2 justify-center items-center w-full px-4 ">
      <div>
        <a className="flex items-center justify-center">
          {version ? `Version ${version}` : "Loading..."}
        </a>

      </div>
   
    </div>
  );
}

export default Footer;
