import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Chat"
}

export default function ChatLayout({children}: { children: React.ReactNode }) {
    return <React.Fragment>
        <div className="w-full h-full">
            {children}
        </div>
    </React.Fragment>;
}