import React from "react";

function Header() {
  return (
    <div
      style={{ marginLeft: 30, marginTop: 46, fontSize: 20 }}
      className="flex items-center bg-white"
    >
      <img
        src={"/bucket.png"}
        alt="logo"
        width="52"
        height="64"
        style={{ marginRight: 17, fontWeight: 500 }}
      />
      <div>
        BlockhainBuilders<b>Faucet</b>
      </div>
    </div>
  );
}

export default Header;
