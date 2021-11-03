import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div
      style={{ marginLeft: 30, marginTop: 32, fontSize: 20 }}
      className="flex items-center bg-white"
    >
      <div style={{ marginRight: 12, fontWeight: 500 }}>
        <Image src="/bucket.png" alt="logo" width="52px" height="52px" />
      </div>

      <div>
        BlockhainBuilders<b>Faucet</b>
      </div>
    </div>
  );
}

export default Header;
