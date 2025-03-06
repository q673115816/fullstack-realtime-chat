"use client";

import { useUserStore } from "@/store/user";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { memo } from "react";
import { useMount } from "react-use";

export default memo(function InitClient() {
  const { setFingerprint } = useUserStore();

  useMount(async () => {
    const fp = await FingerprintJS.load();

    const { visitorId } = await fp.get();
    console.log(visitorId);
    setFingerprint(visitorId);
  });

  return null;
});
