'use client';
import Script from "next/script";

const GoogleAdsense = ({ pId }) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      // onLoad={() => {
      //   (window.adsbygoogle = window.adsbygoogle || []).push({});
      // }}
    />
  );
};

export default GoogleAdsense;