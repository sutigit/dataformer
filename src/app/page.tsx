
'use client';

// react imports
import React, { useState } from "react";

// component imports
import ApiInput from "./components/apiInput";

// data fetching
import { get } from "@/lib/data";

// utils
import { isDisabledIndex } from "@/lib/utils"

// Interfaces
interface Error {
  url: string;
  message: string;
  data: any;
}

interface Data {
  url: string;
  message: string;
  data: any;
}

interface Response {
  success: Data | null,
  error: Error | null,
}


export default function Home() {

  const initSuccess: Data = {
    url: "https://statfin.stat.fi/PxWeb/api/v1/fi/StatFin",
    message: "",
    data: {
      lol: "lol"
    }
  };

  const initSuccess2: Data = {
    url: "https://statfin.stat.fi/PxWeb/api/v1/fi/StatFin/adopt",
    message: "",
    data: {
      lol: "lol"
    }
  };

  const initResponse = {
    success: initSuccess,
    error: null
  }

  const initResponse2 = {
    success: initSuccess2,
    error: null
  }

  const initResponses: Response[] = [initResponse, initResponse2, initResponse, initResponse2];

  const [responses, setResponses] = useState<Response[]>(initResponses);

  const getResponse = async (url: string, index: number) => {

    try {
      if (!url) {
        throw new Error("No valid url");
      }

      const data = await get(url);
      const dataForm: Data = {
        url: url,
        message: "Response OK",
        data: data
      }

      const dataResponse: Response = {
        success: dataForm,
        error: null
      }

      const newData = responses.splice(0, index);
      newData.push(dataResponse);
      setResponses([...newData]);
    }

    catch (error) {

      const errorForm: Error = {
        url: url,
        message: "No valid responses",
        data: error
      }

      const errorResponse: Response = {
        success: null,
        error: errorForm
      }

      const newData = responses.splice(0, index);
      newData.push(errorResponse);
      setResponses([...newData]);
    }
  }

  return (
    <div className="min-h-screen flex justify-center bg-violet-100">
      <main className=" flex flex-col gap-12 p-8 max-w-7xl w-full">

        {responses.length === 0 && (
          <ApiInput
            onGet={(newUrl) => getResponse(newUrl, 0)}
          />
        )}

        {responses.length !== 0 && responses.map((response, index) => (

          <div key={index} className="bg-violet-200 p-8 rounded-2xl border border-zinc-300">
            {
              response.success ?

                // Valid response
                <div>
                  {/* API input */}
                  <ApiInput
                    onGet={(newUrl) => getResponse(newUrl, index)}
                    initUrl={response.success?.url}
                    disabled={isDisabledIndex(index, responses.length - 1)}
                  />

                  <div>
                    <h2 className="text-xl font-bold mt-8">Response</h2>
                    <pre className="p-4 mt-2">
                      {JSON.stringify(response.success?.data, null, 2)}
                    </pre>
                  </div>
                </div>
                :

                // Error response
                <div>
                  {/* API input */}
                  <ApiInput
                    onGet={(newUrl) => getResponse(newUrl, index)}
                    initUrl={response.error?.url}
                    disabled={isDisabledIndex(index, responses.length - 1)}
                  />

                  <div key={index}>
                    <h2 className="text-xl font-bold mt-8">Error</h2>
                    <pre className="bg-red-100 p-4 mt-2">
                      {JSON.stringify(response.error?.message, null, 2)}
                    </pre>
                  </div>

                </div>
            }

          </div>
        ))}
      </main>
    </div>
  );
}
