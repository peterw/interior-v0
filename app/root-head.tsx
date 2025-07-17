"use client"

import dynamic from "next/dynamic"
import Script from "next/script"
import { usePathname } from "next/navigation"

const Head = () => {
  const pathname = usePathname();
  // List of paths where Crisp chat should not be displayed
  const ignoredPaths = ['/share/', '/learn', '/generate-socials', '/onboarding', '/review/collect'];
  // Check if the current path starts with any of the ignored paths
  const shouldExcludeCrisp = ignoredPaths.some(path => pathname?.startsWith(path));

  const CrispChat = dynamic(() => import("@/components/head/crisp-chat"), {
    ssr: false,
  });

  return (
    <head>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://load.server.localrank.so/9cqkkgjyospzn.js?"+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','1h=aWQ9R1RNLUtOWDkyOEZG&sort=asc');
        `}
      </Script>
      {/* End Google Tag Manager */}

      {/* Meta Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1356981688639671');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1356981688639671&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
      {/* End Meta Pixel Code */}

      {/* Twitter conversion tracking base code */}
      <Script id="twitter-pixel" strategy="afterInteractive">
        {`
          !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
          },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
          a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
          twq('config','nw2gn');
        `}
      </Script>
      {/* End Twitter conversion tracking base code */}


      {/* Churnkey - commented out */}
      {/*
      <Script id="churnkey" strategy="afterInteractive">
        {`
          !function(){
            if (!window.churnkey || !window.churnkey.created) {
              window.churnkey = { created: true };
              const a = document.createElement('script');
              a.src = 'https://assets.churnkey.co/js/app.js?appId=5t8yvh8zg';
              a.async = true;
              const b = document.getElementsByTagName('script')[0];
              b.parentNode.insertBefore(a, b);
            }
          }();
        `}
      </Script>
      */}

      {/* Crisp Chat - exclude from specified pages */}
      {!shouldExcludeCrisp && <CrispChat />}

      {/* Leadsy.ai Tag */}
      <Script 
        id="vtag-ai-js" 
        src="https://r2.leadsy.ai/tag.js" 
        data-pid="1mXS2nlzque1F9TBI" 
        data-version="062024"
        async
      />
      
      {/* Tolt Integration */}
      <Script async src="https://cdn.tolt.io/tolt.js" data-tolt="pk_VaE2YuBnYe8hQX7wAJzzEYtM" />
      
      {/* Microsoft Clarity */}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sagpzgb5s4");
          `
        }}
      />
    </head>
  )
}

export default Head;
