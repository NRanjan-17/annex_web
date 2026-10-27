"use client";

import { useEffect, useState } from "react";
import { DOWNLOADS } from "./links";

type Os = "mac" | "windows" | "linux";

function detect(): Os | null {
  const ua = navigator.userAgent;
  if (/Mac OS X|Macintosh/.test(ua) && !/iPhone|iPad/.test(ua)) return "mac";
  if (/Windows/.test(ua)) return "windows";
  if (/Linux/.test(ua) && !/Android/.test(ua)) return "linux";
  return null;
}

const LABEL: Record<Os, string> = { mac: "Download for Mac", windows: "Download for Windows", linux: "Download for Linux" };

/** The main download button: this computer's file when the system is known, else the download section. */
export function DownloadForThisComputer() {
  const [os, setOs] = useState<Os | null>(null);
  useEffect(() => setOs(detect()), []);

  return (
    <a href={os ? DOWNLOADS[os] : "#download"} className="btn btn-primary">
      {os ? LABEL[os] : "Download Annex"}
    </a>
  );
}
