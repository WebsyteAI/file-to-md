import React from 'react';

const AdSense: React.FC = () => {
  return (
    <div className="adsense w-full max-w-2xl mx-auto">
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1234567890"
        data-ad-slot="1234567890"
        data-ad-format="auto"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </div>
  );
};

export default AdSense;