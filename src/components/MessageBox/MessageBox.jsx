import { useState } from 'react';

function MessageBox() {
    const languages = {
        "Türkçe": {
            progress: 1.0,
            label: "C2"
        },
        "English": {
            progress: 0.85,
            label: "B2"
        },
        "Deutsch": {
            progress: null,
            label: "A1"
        }
    };

    const [messages, setMessages] = useState([
        {
            side: "start",
            message: "Any other question?",
        }
    ]);

    const answers = [
        "HMU on cakmakpersonal@gmail.com",
        "uuhh..",
        "I think you should use your seatbelt more often.",
    ]
    function sendMessage(message, side) {
        message = message.trim();
        if (message === "") return;
        setMessages(m => [...m, { side: side, message }]);
        document.getElementById("new-message").value = "";
        if (side === "end") {
            //answer the user
            setTimeout(() => {
                sendMessage(answers[Math.floor(Math.random() * answers.length)], "start");
            }, 1000);
        }
    };


    return (
        <div className="mockup-browser border border-primary bg-base-300">
            <div className="mockup-browser-toolbar">
                <div className="input">web.whatsapp.com</div>
            </div>
            <div className="px-4 py-4 bg-base-200 flex flex-col gap-3">
                <div className='max-h-96 overflow-y-auto'>
                    <div className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full shadow-lg">
                                <img src="/cat.jpg" alt="Avatar" />
                            </div>
                        </div>
                        <div className="chat-bubble shadow-lg">Language?</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full shadow-lg">
                                <img src="/monkey.jpg" alt="Avatar" />
                            </div>
                        </div>
                        <div className="chat-bubble shadow-lg">
                            {Object.entries(languages).map(([language, proficiency], index) => (
                                <div key={index} className="flex gap-2 align-middle items-center justify-between w-full">
                                    <span>{language}</span>
                                    {proficiency.progress !== null ? (
                                        <>
                                            <progress className="progress progress-primary w-32" value={proficiency.progress} max="1.0"></progress>
                                            <span className="font-mono">{proficiency.label}</span>
                                        </>
                                    ) : (
                                        <>
                                            <progress className="progress progress-primary w-32"></progress>
                                            <span className="font-mono">??</span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* messages from both sides */}
                    {messages.map((message, index) => (
                        <div key={index} className={`chat chat-${message.side}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full shadow-lg">
                                    <img src={message.side === "start" ? "/monkey.jpg" : "/cat.jpg"} />
                                </div>
                            </div>
                            <div className={"chat-bubble shadow-lg " + (message.side === "start" ? "text-start" : "text-end")}>{message.message}</div>
                        </div>
                    ))}
                </div>
                <div className="join">
                    <input id="new-message" className="input input-bordered join-item w-full" placeholder="Your Message" />
                    <button onClick={() => { sendMessage(document.getElementById("new-message").value, "end") }} className="btn btn-primary join-item text-xl pt-0 mt-0 pb-2 hover:scale-105 hover:shadow-lg">📨</button>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;
