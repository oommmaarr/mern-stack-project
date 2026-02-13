"use client";
import React, { useEffect, useState } from 'react';
import instance from '../lib/axios';

export default function DebugPage() {
    const [status, setStatus] = useState("Checking...");
    const [token, setToken] = useState("Checking...");
    const [logs, setLogs] = useState([]);

    const log = (msg) => setLogs(prev => [...prev, `${new Date().toISOString().split('T')[1]} - ${msg}`]);

    const runCheck = async () => {
        const localToken = typeof window !== 'undefined' ? localStorage.getItem('jwt') : null;
        setToken(localToken ? `${localToken.substring(0, 10)}...` : "None");

        log("Starting Check Auth...");
        log(`Local Token: ${localToken ? 'Present' : 'Missing'}`);

        try {
            const res = await instance.get("auth/check-auth");
            log(`Success! User: ${res.data.user?.email}`);
            setStatus("Authenticated ✅");
        } catch (error) {
            log(`Error: ${error.message}`);
            if (error.response) {
                log(`Status: ${error.response.status}`);
                log(`Data: ${JSON.stringify(error.response.data)}`);
            }
            setStatus("Not Authenticated ❌");
        }
    };

    useEffect(() => {
        runCheck();
    }, []);

    return (
        <div className="p-10 font-mono text-sm">
            <h1 className="text-2xl font-bold mb-4">Auth Debugger</h1>
            <div className="mb-4 space-y-2">
                <div>Status: <span className="font-bold">{status}</span></div>
                <div>Token: <span className="font-bold p-1 bg-gray-200">{token}</span></div>
            </div>
            <button
                onClick={runCheck}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
            >
                Re-check Auth
            </button>
            <div className="bg-gray-100 p-4 rounded border h-64 overflow-auto">
                {logs.map((L, i) => <div key={i}>{L}</div>)}
            </div>
        </div>
    );
}
