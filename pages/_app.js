import "tailwindcss/tailwind.css";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async function (key) {
          const res = await fetch(key);
          if (!res.ok) {
            throw await res.json();
          }
          return await res.json();
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
