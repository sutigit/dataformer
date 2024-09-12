
'use client';

// react imports
import React, { useState } from "react";

// shadcn import
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// data fetching
import { get } from "@/lib/actions"

// Interfaces
interface Error {
  message: string;
  data: any;
}

interface Data {
  url: string;
  data: any;
}

interface Response {
  success: Data | null,
  error: Error | null,
}


export default function Home() {

  const initData: Data = {
    url: "",
    data: {}
  }

  const initResponse: Response = {
    success: initData,
    error: null
  }

  const [responses, setResponses] = useState<Response[]>([initResponse]);

  const addResponse = async (url: string) => {

    try {
      const data = await get(url);
      const dataForm: Data = {
        url: url,
        data: data
      }

      const dataResponse: Response = {
        success: dataForm,
        error: null
      }

      setResponses([...responses, dataResponse]);
    }

    catch (error) {

      const errorForm: Error = {
        message: "No valid responses",
        data: error
      }

      const errorResponse: Response = {
        success: null,
        error: errorForm
      }

      setResponses([...responses, errorResponse]);
    }
  }

  return (
    <div className="min-h-screen flex justify-center">
      <main className="p-8 max-w-7xl w-full">

        {responses.map((response, index) => (

          <div className="w-full">


            {
              true ?
                // Valid response
                <div key={index} className="w-full">
                  {/* API input */}
                  <div className="flex gap-2">
                    <Input name="api-url" placeholder="API url" value={response.success?.url} />
                    <Button id="api-form" className="bg-black text-white">GET</Button>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mt-8">Response</h2>
                    <pre className="bg-gray-100 p-4 mt-2">
                      {JSON.stringify(response.success?.data, null, 2)}
                    </pre>
                  </div>
                </div>
                :
                // Error response
                <div key={index} className="w-full">
                  {/* API input */}
                  <div className="flex gap-2">
                    <Input name="api-url" placeholder="API url" value={response.success?.url} />
                    <Button id="api-form" className="bg-black text-white">GET</Button>
                  </div>

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
