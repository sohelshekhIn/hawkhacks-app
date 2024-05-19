"use client";

import "@/src/app/globals.css";
import Navbar from "@/src/components/Navbar";
import { HelloNearContract, NetworkId } from "@/src/config";
import { NearContext } from "@/src/context";
import { Wallet } from "@/src/wallets/near";
import { useEffect, useState } from "react";

const wallet = new Wallet({
  networkId: NetworkId,
  createAccessKeyFor: HelloNearContract,
});

// Layout Component
export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <html lang="en">
      <body>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <Navbar
            navItems={[
              {
                name: "Home",
                link: "/",
              },
              {
                name: "About",
                link: "/about-us"
              }
            ]}
          />
          {children}
        </NearContext.Provider>
      </body>
    </html>
  );
}