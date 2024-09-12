// react imports
import React, { useState } from "react";

// shadcn import
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// icons
import PencilIcon from "@/icons/pencil"

// utils
import clsx from "clsx"

export default function ApiInput(
    {
        onGet,
        initUrl,
        disabled
    }: {
        onGet: (url: string) => void,
        initUrl?: string | undefined,
        disabled?: boolean
    }) {



    const [value, setValue] = useState<string>(initUrl || "");
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleClick = () => {
        onGet(value);
    }

    return (
        <div className="flex gap-4">
            <Input
                disabled={!isEditing && disabled}
                placeholder="https://api.example.com"
                value={value}
                className={clsx("bg-white border-zinc-800 font-medium text-md px-8 py-6 rounded-lg", {"border-none": disabled})}
                onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex gap-2">
                {disabled &&
                    <Button
                        onClick={() => setIsEditing(!isEditing)}
                        className={clsx("bg-zinc-800 h-full", {"bg-violet-800": isEditing})}>
                        <PencilIcon size={16} color="#ffffff" />
                    </Button>
                }
                <Button
                    disabled={!isEditing && disabled}
                    className="bg-zinc-800 h-full"
                    onClick={handleClick}>
                    GET
                </Button>
            </div>
        </div>
    );
}